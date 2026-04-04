import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const API_KEY = process.env.VITE_GOOGLE_API_KEY;

async function testEmbedding() {
  const model = "models/gemini-embedding-001";
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${API_KEY}`;
  console.log(`Testing ${url}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text: "test text for dimension check" }] }
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`SUCCESS: Dimension = ${data.embedding.values.length}`);
      console.log('Sample:', data.embedding.values.slice(0, 5));
    } else {
      console.log(`FAILURE: ${JSON.stringify(data)}`);
    }
  } catch (e: any) {
    console.log(`ERROR: ${e.message}`);
  }
}

testEmbedding();
