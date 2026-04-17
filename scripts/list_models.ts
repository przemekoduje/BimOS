import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const API_KEY = process.env.VITE_GOOGLE_API_KEY;

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
  console.log(`Listing models via ${url}...`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
      console.log('--- MODELS ---');
      data.models.forEach((m: any) => {
        console.log(`- ${m.name} (${m.description}) [${m.supportedGenerationMethods.join(',')}]`);
      });
    } else {
      console.log('FAILURE:', JSON.stringify(data));
    }
  } catch (e: any) {
    console.log('ERROR:', e.message);
  }
}

listModels();
