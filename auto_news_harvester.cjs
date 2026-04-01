const fs = require('fs');
const axios = require('axios');

// Configuration
const OUTPUT_FILE = 'public/automated_news.json';
const API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.GOOGLE_CX;
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY; // Using same key for Gemini if applicable

async function runHarvester() {
  console.log("🚀 Starting Automated News Harvester...");

  if (!API_KEY || !CX) {
    console.error("❌ ERROR: Missing GOOGLE_API_KEY or GOOGLE_CX in environment.");
    return;
  }

  try {
    // 1. Search for recent construction law updates
    console.log("🔍 Searching for construction law updates...");
    const searchResponse = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: API_KEY,
        cx: CX,
        q: 'nowe przepisy budowlane 2024 2025 zmiana ustawy prawo budowlane dziennik ustaw',
        num: 5
      }
    });

    const items = searchResponse.data.items || [];
    const searchContext = items.map(item => `Title: ${item.title}\nSnippet: ${item.snippet}`).join('\n\n');

    // 2. Process with Gemini AI
    console.log("🤖 Processing results with Gemini AI...");
    const prompt = `
      Jesteś ekspertem ds. polskiego prawa budowlanego. Na podstawie poniższych wyników wyszukiwania, wybierz 3-4 najbardziej istotne i AKTUALNE zmiany w przepisach lub technologii budowlanej.
      Dla każdej zmiany wygeneruj:
      1. Krótki tytuł do listy (max 10 słów) - to będzie "zajawka" na stronie głównej.
      2. Jednozdaniową notatkę (krótkie wyjaśnienie).
      3. Pełną treść "blogową" (2-3 akapity techniczne), która rozwinie temat po kliknięciu.
      
      Wyniki wyszukiwania:
      ${searchContext}
      
      Zwróć wynik WYŁĄCZNIE jako tablicę obiektów JSON w formacie:
      [
        {
          "id": "auto_1",
          "title": "Tytuł zajawki",
          "category": "Prawo/Technologia/Normy",
          "shortNote": "Krótka notka jednozdaniowa",
          "content": "Pełna treść blogowa z detalami technicznymi...",
          "isNew": true,
          "date": "2024-04-01"
        }
      ]
    `;

    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let rawJson = geminiResponse.data.candidates[0].content.parts[0].text;
    // Clean up markdown code blocks if AI included them
    rawJson = rawJson.replace(/```json|```/g, '').trim();
    
    const newsData = JSON.parse(rawJson);

    // 3. Save to public directory
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(newsData, null, 2));
    console.log(`✅ Success! Automated news saved to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error("❌ Harvester failed:", error.response?.data || error.message);
  }
}

runHarvester();
