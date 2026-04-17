const fs = require('fs');
const path = require('path');
const { isAiDisabled } = require('./check_ai_status.cjs');

// GLOBAL KILL-SWITCH CHECK
if (isAiDisabled()) {
  process.exit(0);
}
const yahooFinance = require('yahoo-finance2').default;

const OUTPUT_JSON = path.join(__dirname, '../public/daily_update.json');
const BIBLIA_MD = path.join(__dirname, '../src/knowledge_base/cKOB_biblia.md');
const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY;

const TECH_TICKERS = ['ADSK', 'BSY', 'TRMB', 'NEM.DE', 'BDX.WA'];
const COMMODITY_TICKERS = [
  { symbol: 'HRC=F', name: 'Stal Zbrojeniowa' }, 
  { symbol: 'LBS=F', name: 'Drewno budowlane' },
  { symbol: 'HG=F', name: 'Miedź (Instalacje)' }
];

async function generateAIContent() {
  if (!GEMINI_API_KEY) {
    console.warn("⚠️ Brak GEMINI_API_KEY. Newsy wygenerowane awaryjnie.");
    return {
      news: [{
        id: "gen_1",
        title: "Aktualizacja prawa w zakresie cyfrowej książki c-KOB",
        category: "Przepisy",
        summary: "Drobne zmiany w strukturze ewidencji z dzisiejszego dnia. Brak autoryzacji do API aby pobrać pełną wersję.",
        timestamp: "Ostatnio",
        sourcesCount: 1,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
      }],
      chatBriefing: "Brak zidentyfikowanych istotnych zmian w prawie.",
      mdAppend: ""
    };
  }

  try {
    const prompt = `
Jako elitarny asystent prawno-budowlany wygeneruj podsumowanie DZISIEJSZYCH (najnowszych na ten rok) wytycznych dotyczących cKOB (Cyfrowa Książka Obiektu Budowlanego) i prawa budowlanego. Wynik MUSI być formatem JSON bazującym na tej strukturze:
{
  "news": [
    {
      "id": "1",
      "title": "Krótki tytuł newsa prawno-budowlanego na stronę główną",
      "category": "Regulacje / Technologia",
      "summary": "Krótkie streszczenie do 2 zdań o cKOB.",
      "timestamp": "Dzisiaj",
      "sourcesCount": 5,
      "imageUrl": "https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=800"
    }
  ],
  "chatBriefing": "Krótkie jednozdaniowe powiadomienie do asystenta Czatowego z instrukcją o czym ma dzisiaj w razie pytań opowiadać z newsów (np. Zmiany w protokołach kominiarskich cKOB).",
  "mdAppend": "Kompletny paragraf w języku Markdown (ok. 300 znaków) opisujący fachowo wejście w życie tej dzisiejszej zmiany."
}

Generuj bezpośrednio raw JSON bez znaczników \`\`\`json.
`;
    const res = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    let rawJson = res.data.candidates[0].content.parts[0].text;
    rawJson = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(rawJson);
  } catch (error) {
    console.error("❌ Błąd Gemini API:", error?.response?.data || error.message);
    throw error;
  }
}

async function fetchMarket() {
  const mapStock = async (ticker) => {
    try {
      const q = await yahooFinance.quote(ticker);
      const isPos = q.regularMarketChangePercent > 0;
      return {
        name: q.shortName || ticker,
        val: q.regularMarketPrice.toFixed(2) + " " + q.currency,
        ticker: ticker,
        change: (isPos ? "+" : "") + q.regularMarketChangePercent.toFixed(2) + "%",
        trend: isPos ? "positive" : "negative"
      };
    } catch { return null; }
  };

  const mapComm = async (item) => {
    try {
      const q = await yahooFinance.quote(item.symbol);
      const isPos = q.regularMarketChangePercent > 0;
      return {
        name: item.name,
        val: q.regularMarketPrice.toFixed(2) + " " + q.currency,
        ticker: item.symbol.replace("=F", ""),
        change: (isPos ? "+" : "") + q.regularMarketChangePercent.toFixed(2) + "%",
        trend: isPos ? "positive" : "negative"
      };
    } catch { return null; }
  };

  const techStocks = (await Promise.all(TECH_TICKERS.map(mapStock))).filter(Boolean);
  const commodities = (await Promise.all(COMMODITY_TICKERS.map(mapComm))).filter(Boolean);
  return { techStocks, commodities };
}

async function run() {
  console.log("🚀 Uruchamianie Harvestera Danych...");
  try {
    const marketData = await fetchMarket();
    console.log("📈 Pobrano dane giełdowe!");

    const aiContent = await generateAIContent();
    console.log("🤖 Wygenerowano brief prawny cKOB!");

    const outputData = {
      lastUpdate: new Date().toISOString(),
      news: aiContent.news,
      chatBriefing: aiContent.chatBriefing,
      marketData: marketData
    };
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(outputData, null, 2), "utf-8");
    console.log("✅ Nadpisano public/daily_update.json");

    if (aiContent.mdAppend && aiContent.mdAppend.length > 20) {
      const dbContent = fs.readFileSync(BIBLIA_MD, "utf-8");
      if (!dbContent.includes(aiContent.mdAppend.substring(0, 50))) {
        const docHeader = "\\n\\n### ZMIANY Z DNIA " + new Date().toLocaleDateString() + "\\n";
        fs.appendFileSync(BIBLIA_MD, docHeader + aiContent.mdAppend, "utf-8");
        console.log("✅ Baza cKOB zaktualizowana!");
      } else {
        console.log("ℹ️ Baza MD posiada już najnowszy wtręt.");
      }
    }
  } catch (err) {
    console.error("❌ Skrypt zatrzymany z błędem:", err);
  }
}

run();
