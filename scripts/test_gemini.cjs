const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const key = process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;

async function test(model) {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    console.log(`Testing ${model}...`);
    const res = await axios.post(url, {
      contents: [{ parts: [{ text: "say hello" }] }]
    });
    console.log(`✅ ${model} works!`);
    return true;
  } catch (e) {
    console.log(`❌ ${model} failed: ${e.response?.status} ${e.response?.statusText}`);
    return false;
  }
}

async function run() {
  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-pro', 'gemini-1.5-pro'];
  for (const m of models) {
    if (await test(m)) break;
  }
}

run();
