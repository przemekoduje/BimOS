const fs = require('fs');
const axios = require('axios');
const PDFParser = require("pdf2json");

const PDF_URLS = [
  'https://slk.piib.org.pl/pliki/listy/uslugi_i_rzeczoznawcy.pdf',
  'https://slk.piib.org.pl/pliki/listy/SE.pdf'
];
const DATA_FILE = 'engineers_data.json';
const PENDING_FILE = 'public/enrichment_pending.json';

const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
// Solid regex for Polish mobile and landline numbers, allowing spaces and optional +48
const phoneRegex = /\b(?:\+?48[\s-]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})\b/i;

async function parsePDF(url) {
  console.log(`Pobieranie pliku: ${url}...`);
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(this, 1);
    pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent());
    });
    // Parse the buffer
    pdfParser.parseBuffer(response.data);
  });
}

async function run() {
  let combinedText = '';
  for (const url of PDF_URLS) {
    try {
      const text = await parsePDF(url);
      combinedText += text + '\n\n';
    } catch (err) {
      console.error(`Nie udało się pobrać lub przetworzyć ${url}:`, err.message);
    }
  }

  console.log("Pliki PDF zostały pomyślnie przetworzone. Analizowanie danych...");
  
  // Normalizujemy spacje i wielkość liter do wyszukiwania
  const normalizedText = combinedText.replace(/\s+/g, ' ').toLowerCase();

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Brak pliku ${DATA_FILE}.`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  let pendingList = [];
  if (fs.existsSync(PENDING_FILE)) {
    pendingList = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
  }

  let foundCount = 0;

  for (const engineer of data) {
    const contact = engineer.attributes?.contact_data?.address || {};
    const hasEmail = !!contact.email_address;
    const hasPhone = !!contact.phone_number;

    if (hasEmail && hasPhone) continue;

    const name = engineer.attributes?.personal_details?.name_and_last_name;
    if (!name) continue;

    // Pliki PDF często mają zamienione imię z nazwiskiem lub drobne różnice. By uprościć, szukamy dokładnego dopasowania.
    // Ewentualnie można rozbić na imię i nazwisko:
    const nameParts = name.toLowerCase().split(' ');
    if (nameParts.length < 2) continue;
    
    // Szukamy kombinacji "Imię Nazwisko" lub "Nazwisko Imię"
    const nameKey1 = `${nameParts[0]} ${nameParts[1]}`;
    const nameKey2 = `${nameParts[1]} ${nameParts[0]}`;

    let idx = normalizedText.indexOf(nameKey1);
    if (idx === -1) idx = normalizedText.indexOf(nameKey2);

    if (idx !== -1) {
      // Pobieramy okienko 300 znaków po znalezieniu osoby
      const windowText = normalizedText.substring(idx, idx + 300);
      
      let foundEmail = null;
      let foundPhone = null;

      if (!hasEmail) {
        const emailMatch = windowText.match(emailRegex);
        if (emailMatch) {
            foundEmail = emailMatch[0].replace('mailto:', ''); // Oczyszczamy jeśli pdf wygenerował ucieczkę
        }
      }

      if (!hasPhone) {
        const phoneMatch = windowText.match(phoneRegex);
        if (phoneMatch) foundPhone = phoneMatch[0];
      }

      if (foundEmail || foundPhone) {
        console.log(`[+] Znaleziono w PDF: ${name} -> Email: ${foundEmail || '-'} | Tel: ${foundPhone || '-'}`);
        
        const license = engineer.attributes?.decision?.permission_number || engineer.attributes?.decision?.decision_number;
        const alreadyPending = pendingList.find(p => String(p.id) === String(engineer.id));
        
        if (!alreadyPending) {
          pendingList.unshift({
            id: engineer.id,
            timestamp: new Date().toISOString(),
            name: name,
            license: license,
            email: foundEmail || '',
            phone: foundPhone || ''
          });
          foundCount++;
        } else {
           let updated = false;
           if (foundEmail && !alreadyPending.email) { alreadyPending.email = foundEmail; updated = true; }
           if (foundPhone && !alreadyPending.phone) { alreadyPending.phone = foundPhone; updated = true; }
           if (updated) foundCount++;
        }
      }
    }
  }

  fs.writeFileSync(PENDING_FILE, JSON.stringify(pendingList, null, 2));
  console.log(`========================================`);
  console.log(`Gotowe! Zidentyfikowano i wysłano do poczekalni ${foundCount} nowych danych do akceptacji.`);
}

run();
