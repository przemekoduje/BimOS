const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(null, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const content = pdfParser.getRawTextContent();
    fs.writeFileSync("public/Awarie_analysis.txt", content);
    console.log("PDF analysis complete. Content saved to public/Awarie_analysis.txt");
});

pdfParser.loadPDF("public/Awarie.pdf");
