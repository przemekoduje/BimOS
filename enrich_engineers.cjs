const fs = require('fs');
const axios = require('axios');

// Ścieżka do bazy inżynierów
const DATA_FILE = 'engineers_data.json';
const PUBLIC_DATA_FILE = 'public/engineers_data.json';
const LOG_FILE = 'public/enrichment_logs.json';
const STATUS_FILE = 'public/enrichment_status.json';

// Funkcja pomocnicza do zapisu statusu (Heartbeat)
const updateStatus = (statusInfo) => {
  try {
    const statusData = {
      status: statusInfo.status || 'running',
      lastActive: new Date().toISOString(),
      message: statusInfo.message || 'Skrypt poszukuje danych...',
      totalChecked: statusInfo.totalChecked || 0,
    };
    fs.writeFileSync(STATUS_FILE, JSON.stringify(statusData, null, 2));
  } catch(e) { /* ignore */ }
};

// Funkcja pomocnicza do uśpienia skryptu (Rate limiting)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Losowy czas oczekiwania między zapytaniami, żeby uniknąć blokady (np. 15-30 sekund)
const getRandomDelay = () => Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);

// Proste wyrażenie regularne do wyciągania e-maili
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;

async function searchForEmail(query) {
  try {
    // Używamy prostej wersji HTML DuckDuckGo (mniejsza szansa na szybki bloking niż Google)
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'pl-PL,pl;q=0.8,en-US;q=0.5,en;q=0.3'
      },
      timeout: 10000
    });

    const html = response.data;
    
    // Szukamy wszystkich e-maili w zwróconym kodzie HTML (w fragmentach wyników)
    const matches = html.match(emailRegex);
    
    if (matches && matches.length > 0) {
      // Usuwamy duplikaty i potencjalne fałszywe maile (jakieś z dymków duckduckgo itp.)
      const uniqueEmails = [...new Set(matches.map(e => e.toLowerCase()))];
      // Proste filtrowanie oczywistych śmieci
      const validEmails = uniqueEmails.filter(e => 
        !e.includes('duckduckgo') && 
        !e.includes('rating@') &&
        !e.includes('example.com') &&
        e.length > 6
      );
      
      return validEmails.length > 0 ? validEmails[0] : null;
    }
  } catch (error) {
    console.error(`Błąd podczas wyszukiwania dla "${query}":`, error.message);
  }
  return null;
}

async function enrichEngineers() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`Plik ${DATA_FILE} nie istnieje! Uruchom najpierw extract_engineers.cjs`);
    updateStatus({ status: 'error', message: 'Brak pliku bazy ról.' });
    return;
  }

  let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  let enrichedCount = 0;
  let checkedCount = 0;

  console.log(`Rozpoczęto proces wzbogacania danych. Łączna liczba inżynierów: ${data.length}`);
  updateStatus({ status: 'running', message: 'Rozpoczynanie procesu...', totalChecked: checkedCount });

  // Łapiemy przerwania żeby elegancko zamknąć status
  process.on('SIGINT', () => {
    console.log("Przerwano działanie skryptu.");
    updateStatus({ status: 'stopped', message: 'Skrypt zatrzymany ręcznie.' });
    process.exit();
  });

  try {
    for (let i = 0; i < data.length; i++) {
      const engineer = data[i];
    
    // Sprawdzamy czy inżynier ma już email (w dowolnym z możliwych miejsc struktury e-CRUB)
    const currentEmail = engineer.attributes?.email_address || 
                         engineer.attributes?.contact_data?.address?.email_address;
                         
    if (!currentEmail) {
      const name = engineer.attributes?.personal_details?.name_and_last_name;
      const license = engineer.attributes?.decision?.permission_number || engineer.attributes?.decision?.decision_number;
      
      if (!name) continue;

      console.log(`[${i+1}/${data.length}] Szukam emaila dla: ${name} (${license || 'brak upr.'})`);
      
      // Tworzymy precyzyjne zapytanie
      const query = `"${name}" "uprawnienia budowlane" OR inżynier email kontakt`;
      
      const foundEmail = await searchForEmail(query);
      
      if (foundEmail) {
        console.log(` > ZNALEZIONO EMAIL: ${foundEmail}`);
        
        // Dodajemy wpis do logów dla UI do zatwierdzenia przez admina
        let pendingList = [];
        const PENDING_FILE = 'public/enrichment_pending.json';
        if (fs.existsSync(PENDING_FILE)) {
          pendingList = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8'));
        }
        
        // Sprawdzamy, czy ten inżynier już tam nie czeka
        const alreadyPending = pendingList.find(p => p.id === engineer.id);
        if (!alreadyPending) {
          pendingList.unshift({
            id: engineer.id,
            timestamp: new Date().toISOString(),
            name: name,
            license: license,
            email: foundEmail
          });
          fs.writeFileSync(PENDING_FILE, JSON.stringify(pendingList, null, 2));
          enrichedCount++;
        }

      } else {
        console.log(` > Nie znaleziono emaila.`);
      }
      
      checkedCount++;
      updateStatus({ status: 'running', message: `Oczekiwanie po przetworzeniu ${name}...`, totalChecked: checkedCount });

      // Oczekujemy "powoli w tle", aby symulować człowieka i nie dostać bana
      const delay = getRandomDelay();
      console.log(`Oczekiwanie ${delay / 1000} sekund...`);
      await sleep(delay);
    }
  }
  } catch (err) {
    console.error("Wystąpił błąd w głównej pętli:", err);
    updateStatus({ status: 'error', message: 'Wystąpił błąd podczas działania: ' + err.message });
  }

  updateStatus({ status: 'stopped', message: 'Przeszukano wszystkich inżynierów z pustym adresem email.' });
  console.log(`Proces zakończony. Wzbogacono ${enrichedCount} rekordów.`);
}

enrichEngineers();
