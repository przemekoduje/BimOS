const fs = require('fs');
const path = require('path');

async function checkModels() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    const env = fs.readFileSync(envPath, 'utf8');
    const apiKeyLine = env.split('\n').find(l => l.includes('VITE_GOOGLE_API_KEY='));
    const apiKey = apiKeyLine.split('=')[1].trim().replace(/['"]/g, '');

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

checkModels();
