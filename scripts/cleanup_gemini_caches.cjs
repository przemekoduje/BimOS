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
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

if (!API_KEY) {
  console.error("❌ BŁĄD: Brak VITE_GOOGLE_API_KEY w pliku .env");
  process.exit(1);
}

async function cleanupCaches() {
  console.log("🔍 Szukam aktywnych cache'y na koncie Google AI...");
  
  try {
    // 1. LIST CACHES
    const listUrl = `${API_BASE_URL}/cachedContents?key=${API_KEY}`;
    const listRes = await axios.get(listUrl);
    
    const caches = listRes.data.cachedContents || [];
    
    if (caches.length === 0) {
      console.log("✅ Nie znaleziono aktywnych cache'y. Konto jest czyste.");
      return;
    }

    console.log(`❕ Znaleziono ${caches.length} aktywnych obiektów cache. Usuwanie...`);

    // 2. DELETE EACH CACHE
    for (const cache of caches) {
      const deleteUrl = `${API_BASE_URL}/${cache.name}?key=${API_KEY}`;
      try {
        await axios.delete(deleteUrl);
        console.log(`   🗑️  Usunięto: ${cache.name} (${cache.displayName || 'No Name'})`);
      } catch (delErr) {
        console.error(`   ❌ Błąd przy usuwaniu ${cache.name}:`, delErr.message);
      }
    }

    console.log("\n🚀 Wszystkie cache zostały pomyślnie wyczyszczone!");
    console.log("Zaprzestano naliczania opłat za 'Generate content cached content storage'.");

  } catch (error) {
    console.error("❌ Błąd krytyczny podczas czyszczenia:", error.response?.data || error.message);
  }
}

cleanupCaches();
