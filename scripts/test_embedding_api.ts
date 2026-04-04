import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const API_KEY = process.env.VITE_GOOGLE_API_KEY;

async function testEmbedding(version: string, model: string) {
  const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:embedContent?key=${API_KEY}`;
  console.log(`Testing ${url}...`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text: "test" }] },
        output_dimensionality: 768
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`SUCCESS [${version}/${model}]: Dim: ${data.embedding.values.length}`);
    } else {
      console.log(`FAILURE [${version}/${model}]: ${JSON.stringify(data)}`);
    }
  } catch (e: any) {
    console.log(`ERROR [${version}/${model}]: ${e.message}`);
  }
}

async function runTests() {
  await testEmbedding('v1', 'text-embedding-004');
  await testEmbedding('v1beta', 'text-embedding-004');
  await testEmbedding('v1', 'embedding-001');
}

runTests();
