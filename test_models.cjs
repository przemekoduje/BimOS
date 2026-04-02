const fs = require('fs');
const path = require('path');

async function testModels() {
  const envPath = path.join(process.cwd(), '.env');
  const env = fs.readFileSync(envPath, 'utf8');
  const apiKeyLine = env.split('\n').find(l => l.includes('VITE_GOOGLE_API_KEY='));
  const apiKey = apiKeyLine.split('=')[1].trim().replace(/['"]/g, '');

  const modelsToTest = [
    "models/gemini-1.5-flash",
    "models/gemini-1.5-flash-001",
    "models/gemini-1.5-flash-002",
    "models/gemini-1.5-flash-8b",
    "models/gemini-2.0-flash-exp",
    "models/gemini-2.0-flash-lite-exp"
  ];

  for (const model of modelsToTest) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "ping" }] }] })
      });
      const data = await response.json();
      if (data.candidates) {
        console.log(`[SUCCESS] ${model} works!`);
        return;
      } else {
        console.log(`[FAILED] ${model}: ${JSON.stringify(data.error || data)}`);
      }
    } catch (e) {
      console.log(`[ERROR] ${model}: ${e.message}`);
    }
  }
}

testModels();
