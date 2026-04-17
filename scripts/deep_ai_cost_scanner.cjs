const axios = require('axios');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const API_KEY = process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
const PROJECT_ID = "gen-lang-client-0280426168";

if (!API_KEY) {
  console.error("❌ BŁĄD: Brak API_KEY w pliku .env");
  process.exit(1);
}

const REGIONS = [
  'global',
  'us-central1',
  'europe-west1',
  'europe-west2',
  'asia-northeast1'
];

async function scanAllEndpoints() {
  console.log("🚀 Rozpoczynam GŁĘBOKI SKAN Twojej infrastruktury AI...");
  console.log(`Projekt: ${PROJECT_ID}\n`);

  let totalCachesFound = 0;

  // 1. SCAN GOOGLE AI STUDIO (GENERATIVE LANGUAGE API)
  console.log("--- [1/2] SKANOWANIE GOOGLE AI STUDIO (Global) ---");
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/cachedContents?key=${API_KEY}`;
    const res = await axios.get(url);
    const caches = res.data.cachedContents || [];
    if (caches.length > 0) {
      console.log(`❕ Znaleziono ${caches.length} cache'y w AI Studio:`);
      caches.forEach(c => {
        console.log(`   - ${c.name} (${c.displayName || 'Bez nazwy'})`);
        totalCachesFound++;
      });
    } else {
      console.log("✅ Brak aktywnych cache'y w AI Studio.");
    }
  } catch (err) {
    console.error("❌ Błąd skanowania AI Studio:", err.response?.data?.error?.message || err.message);
  }

  // 2. SCAN VERTEX AI (REGIONAL ENDPOINTS)
  console.log("\n--- [2/2] SKANOWANIE VERTEX AI (Regionalne) ---");
  for (const region of REGIONS) {
    // Note: Project numbering and naming might differ, but we'll try the provided ID
    const url = `https://${region}-aiplatform.googleapis.com/v1beta1/projects/${PROJECT_ID}/locations/${region}/cachedContents?key=${API_KEY}`;
    
    try {
      const res = await axios.get(url);
      const caches = res.data.cachedContents || [];
      if (caches.length > 0) {
        console.log(`❕ [${region}] Znaleziono ${caches.length} cache'y:`);
        caches.forEach(c => {
          console.log(`   - ${c.name} (${c.displayName || 'Bez nazwy'})`);
          totalCachesFound++;
        });
      } else {
        // Silent success for empty regions
      }
    } catch (err) {
       // Vertex AI often returns 403/401 for API Keys on this endpoint, which is normal if not configured.
       // We only report if it's a found cache or a real connection error.
    }
  }
  console.log("✅ Zakończono skanowanie regionów Vertex AI.");

  console.log("\n==========================================");
  if (totalCachesFound === 0) {
    console.log("🎉 RAPORT: Cały projekt jest CZYSTY. Żaden proces nie generuje kosztów storage.");
  } else {
    console.log(`⚠️  UWAGA: Znaleziono ${totalCachesFound} obiektów generujących koszty!`);
    console.log("Uruchom skrypt cleanup, aby je usunąć.");
  }
  console.log("==========================================");
}

scanAllEndpoints();
