import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

const dir = path.join(process.cwd(), 'docs', 'cKOB');
const outPath = path.join(process.cwd(), 'src', 'knowledge_base', 'cKOB.md');

async function run() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
  let fullMarkdown = '# BIBLIA cKOB (Cyfrowa Książka Obiektu Budowlanego)\n\n';
  
  for (const file of files) {
    console.log(`Extracting ${file}...`);
    const dataBuffer = fs.readFileSync(path.join(dir, file));
    try {
      const data = await pdfParse(dataBuffer);
      fullMarkdown += `## Dokument: ${file}\n\n`;
      fullMarkdown += data.text + '\n\n---\n\n';
      console.log(`✅ ${file} wyekstrahowany pomyślnie (${data.numpages} stron).`);
    } catch(err) {
      console.error(`Błąd podczas parsowania ${file}:`, err);
    }
  }
  
  const targetDir = path.dirname(outPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  fs.writeFileSync(outPath, fullMarkdown);
  console.log(`\nZapisano do ${outPath}. Rozmiar wiedzy: ${(fullMarkdown.length / 1024).toFixed(2)} KB`);
}

run().catch(console.error);
