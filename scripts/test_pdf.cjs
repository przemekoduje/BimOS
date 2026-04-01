const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

console.log("Typ pdfParse: ", typeof pdfParse);
if (typeof pdfParse === 'function') {
    const dataBuffer = fs.readFileSync('docs/cKOB/Materiały szkoleniowe 31032026.pdf');
    pdfParse(dataBuffer).then(function(data) {
        console.log("Udało się wyciągnąć strony: ", data.numpages);
    }).catch(function(error) {
        console.error("Błąd parsowania: ", error);
    });
} else {
    console.log("Eksport: ", pdfParse);
}
