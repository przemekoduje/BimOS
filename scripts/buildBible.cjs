const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

const dir = path.join(process.cwd(), 'docs', 'cKOB');
const outPath = path.join(process.cwd(), 'src', 'knowledge_base', 'cKOB.md');

async function extractText(dataBuffer) {
  const data = new Uint8Array(dataBuffer);
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str);
    text += strings.join(' ') + '\n\n';
  }
  return { text, numpages: pdf.numPages };
}

async function run() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
  let fullMarkdown = '# BIBLIA cKOB (Cyfrowa Książka Obiektu Budowlanego)\n\n';
  
  for (const file of files) {
    console.log(`Extracting ${file}...`);
    const dataBuffer = fs.readFileSync(path.join(dir, file));
    try {
      const data = await extractText(dataBuffer);
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
