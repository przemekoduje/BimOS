const fs = require('fs');
const axios = require('axios');
const { isAiDisabled } = require('./scripts/check_ai_status.cjs');

// Konfiguracja plików
const DATA_FILE = 'engineers_data.json';
const TRACKER_FILE = 'public/google_api_tracker.json';
const PENDING_FILE = 'public/enrichment_pending.json';

// Dzienny darmowy limit Google to 100, ustawiamy twardą blokadę na 99, by zostawić margines błędu.
const DAILY_LIMIT = 99;

// Pobieranie kluczy ze zmiennych środowiskowych uodparnia na kradzież
const API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.GOOGLE_CX;

const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;

async function run() {
  if (!API_KEY || !CX) {
    console.error("❌ BŁĄD: Brak kluczy Google API.");
    console.log("Aby uruchomić poprawnie skrypt, stwórz plik .env w katalogu z projektem i dodaj do niego:");
    console.log("GOOGLE_API_KEY=TWOJ_KLUCZ_API");
    console.log("GOOGLE_CX=TWOJ_ID_WYSZUKIWARKI");
    console.log("A następnie uruchom skrypt poleceniem: node --env-file=.env google_search_enrichment.cjs");
    return;
  }

  const dzisiaj = new Date().toISOString().split('T')[0];
  let tracker = { date: dzisiaj, count: 0 };
  
  if (fs.existsSync(TRACKER_FILE)) {
    const existingTracker = JSON.parse(fs.readFileSync(TRACKER_FILE, 'utf8'));
    // Jeśli mamy wpisy z dzisiejszą datą, kontynuujemy nabijanie limitu
    if (existingTracker.date === tracker.date) {
      tracker.count = existingTracker.count;
    }
  }

  if (tracker.count >= DAILY_LIMIT) {
    console.log(`⚠️ Osiągnięto już dzisiejszy limit darmowego API Google (${DAILY_LIMIT} zapytań).`);
    console.log(`Wróć jutro, aby kontynuować przeszukiwanie za 0 zł!`);
    return;
  }

  if (!fs.existsSync(DATA_FILE)) {
      console.error(`Brak pliku ${DATA_FILE}.`);
      return;
  }

  // Wczytanie Bazy (aby nadać flagę searched == true)
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  
  // Wczytanie Poczekalni
  let pendingList = fs.existsSync(PENDING_FILE) ? JSON.parse(fs.readFileSync(PENDING_FILE, 'utf8')) : [];
  
  let queriesLeft = DAILY_LIMIT - tracker.count;
  let foundCount = 0;
  let modificationsMade = false;

  console.log(`\n🔍 Pozostało darmowych zapytań z puli Google API na dziś: ${queriesLeft}\n`);

  for (let i = 0; i < data.length; i++) {
    if (queriesLeft <= 0) break; // koniec puli darmowej

    const engineer = data[i];
    const contact = engineer.attributes?.contact_data?.address || {};
    
    // Ważne: Flaga "google_searched" chroni przed odpytywaniem o tego samego inżyniera następnego dnia!
    if (contact.google_searched) continue;
    
    const hasEmail = !!contact.email_address;
    if (hasEmail) {
       // Zabezpieczamy tych, co dawno mieli maila i o nich zapomnieliśmy, nadając im z automatu flagę.
       if (!engineer.attributes.contact_data) engineer.attributes.contact_data = { address: {} };
       engineer.attributes.contact_data.address.google_searched = true;
       modificationsMade = true;
       continue;
    }

    const name = engineer.attributes?.personal_details?.name_and_last_name;
    if (!name) continue;

    console.log(`[Zapytanie API - limit ${queriesLeft}] Szukam: ${name}`);
    const query = `"${name}" inżynier email OR kontakt`;

    try {
      const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
        params: {
          key: API_KEY,
          cx: CX,
          q: query,
          num: 3 // Pobieramy maksymalnie opisy (Snippety) z 3 pierwszych wyników
        }
      });
      
      tracker.count++;
      queriesLeft--;

      // Niezależnie od wyniku - oznaczamy inżyniera jako odpytanego w Google API, by nie spalić na niego puli zapytań jutro
      if (!engineer.attributes.contact_data) engineer.attributes.contact_data = { address: {} };
      if (!engineer.attributes.contact_data.address) engineer.attributes.contact_data.address = {};
      engineer.attributes.contact_data.address.google_searched = true;
      modificationsMade = true;

      // System twardego zapisu trackera zabezpiecza przed utratą limitów, gdy terminal zostanie gwałtownie przerwany
      fs.writeFileSync(TRACKER_FILE, JSON.stringify(tracker, null, 2));

      // Ekstrakcja Maili na podstawie połączonych Snippetów i Tytułów kart:
      const items = response.data.items || [];
      let foundEmail = null;

      for (const item of items) {
        const text = (item.snippet || '') + ' ' + (item.title || '');
        const match = text.match(emailRegex);
        if (match) {
          foundEmail = match[0];
          break;
        }
      }

      if (foundEmail) {
         console.log(`   > [✔] Znaleziono w wynikach (API): ${foundEmail}`);
         const license = engineer.attributes?.decision?.permission_number || engineer.attributes?.decision?.decision_number;
         
         const alreadyPending = pendingList.find(p => String(p.id) === String(engineer.id));
         if (!alreadyPending) {
           pendingList.unshift({
             id: engineer.id,
             timestamp: new Date().toISOString(),
             name: name,
             license: license,
             email: foundEmail
           });
           foundCount++;
           
           // Natychmiast zrzucamy do poczekalni
           fs.writeFileSync(PENDING_FILE, JSON.stringify(pendingList, null, 2));
         }
      } else {
         console.log(`   > [✗] Brak użytecznych informacji w pierwszych wynikach.`);
      }

    } catch (err) {
      console.error(`\n🚨 Osiągnięto błąd Google API: ${err.response?.data?.error?.message || err.message}`);
      break; 
    }
  }

  if (modificationsMade) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }

  console.log(`\n================================`);
  console.log(`Miesięczne zapisywanie zakończone.`);
  console.log(`Wykorzystane zapytania Google API dzisiaj: ${tracker.count} / ${DAILY_LIMIT}`);
  console.log(`Skutecznie wyłapane adresy email dodane do poczekalni: ${foundCount}`);
}

run();
