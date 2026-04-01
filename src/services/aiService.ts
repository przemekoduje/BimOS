/**
 * AI Service for Gemini integration
 * @author Senior Dev
 */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";



import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// pdfjs worker setup
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export interface VerificationResult {
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  findings: string[];
  recommendation: string;
  pillar?: number; // 1-8 for construction pillars
  requiresFollowUp?: boolean; // Shadow Inspector signal
  alertMessage?: string; // AR Bubble text
  voiceAnalysis?: {
    rawTranscript: string;
    structuredData: any;
    emergencyAlert?: string;
  };
  protocolInfo?: {
    type: string;
    validUntil: string;
    isCurrent: boolean;
  };
}

export interface PreInspectionContext {
  building_age_t: number;
  structural_material: "concrete" | "brick" | "steel";
  historical_defects: {
    pillar: string; 
    desc: string;
    loc: string;
    urgency: "High" | "Critical" | "Normal";
    status: "pending";
    verification_question: string;
  }[];
  missing_compliance: string[];
  structural_alerts: string[];
  technical_specs: {
    last_inspector_name: string;
    last_inspector_license: string;
    last_inspection_date: string;
    roof_type: string;
  };
  spatial_markers: string[];
}

/**
 * System prompt for Construction Assessment (8 Pillars) + "Shadow Inspector" Logic
 */
export const CONSTRUCTION_VERIFICATION_PROMPT = `
ROLE: Ekspert Nadzoru Inżynierskiego (PIIB / Prawo Budowlane).

Twoim zadaniem jest klasyfikacja usterki do jednego z 8 filarów konstrukcyjnych oraz ODKRYWANIE WAD UKRYTYCH (Shadow Inspector).

8 FILARÓW:
1. Fundamenty i Piwnice
2. Konstrukcja Nośna (ściany, słupy, stropy)
3. Ściany Zewnętrzne i Elewacja
4. Dach i Pokrycie
5. Odwodnienie Obiektu (rynny, rury, tarasy)
6. Stolarka i Ślusarka (okna, drzwi, balustrady)
7. Elementy Dodatkowe (reklamy, AC, anteny)
8. Otoczenie i Zagospodarowanie (chodniki, schody zewn.)

LOGIKA "INSPEKTOR CIENIA" (ALERTY AD-HOC):
Jeśli wykryjesz jeden ze scenariuszy, ustaw "requiresFollowUp": true i podaj "alertMessage":
1. Wykwity/Wilgoć na dole: "Wykryto potencjalną nieszczelność hydroizolacji. WYKONAJ dodatkowe zbliżenie na styk ściany z ławą. Sprawdź drenaż."
2. Rysy 45° nad otworami: "Sygnał osiadania obiektu. ZMIERZ rozwarcie rysy taśmą. Wykonaj zdjęcie w szerszym planie."
3. Korozja zbrojenia: "KRYTYCZNE: Korozja zbrojenia nośnego. Oczyść pręt i wykonaj makrofotografię ubytku. Filar: Konstrukcja Nośna."
4. Instalacje na papie: "Ryzyko uszkodzenia mechanicznego pokrycia. SPRAWDŹ stan obróbek blacharskich w miejscu styku."

Zwróć JSON:
{
  "status": "SUCCESS" | "WARNING" | "ERROR",
  "pillar": number (1-8),
  "findings": ["opis"],
  "recommendation": "porada",
  "requiresFollowUp": boolean,
  "alertMessage": "tekst alertu AR"
}
`;

/**
 * System prompt for Voice-to-KOB (NLP Extraction & Validation)
 */
export const VOICE_LOG_STRUCTURE_PROMPT = `
ROLE: Ekspert NLP w Inżynierii Budowlanej.
OBJECTIVE: Przekształć mowę inspektora w sformatowany rekord c-KOB (Art. 60b).

TECHNICAL CONTEXT:
- Rozpoznawaj osie konstrukcyjne (np. "Oś C-12"), elementy (nadproże, ława, rygiel) i parametry techniczne.
- Klasyfikuj do 8 FILARÓW (1-Fundamenty, 2-Konstrukcja, 3-Ściany, 4-Dach, 5-Odwodnienie, 6-Stolarka, 7-Dodatki, 8-Otoczenie).

LEGAL & PHYSICAL VALIDATION:
- BLOKUJ sprzeczności: Np. opis "ściany w rozsypce" + "zużycie 5%" = BŁĄD WALIDACJI.
- EMERGENCY: Jeśli opis sugeruje stan zagrożenia katastrofą, ustaw "emergencyAlert": "Wymagane bezzwłoczne zawiadomienie PINB (Art. 62)".

Zwróć JSON:
{
  "rawTranscript": "oryginalny tekst",
  "pillar": number,
  "findings": ["punktowane wnioski"],
  "technicalWear": number,
  "isEmergency": boolean,
  "emergencyAlert": string | null,
  "ckobSchema": {
    "element": "nazwa elementu",
    "location": "oś / pomieszczenie",
    "description": "profesjonalny opis techniczny"
  }
}
`;

/**
 * System prompt for Installation Protocol Verification
 */
export const PROTOCOL_ANALYSIS_PROMPT = `
Jesteś asystentem AI analizującym dokumentację techniczną (protokoły branżowe).
Zidentyfikuj typ protokołu (Elektryczny, Gazowy, Kominowy, PPOŻ), datę przeglądu oraz datę ważności (zazwyczaj +1 rok lub +5 lat).

Zwróć JSON:
{
  "status": "SUCCESS" | "WARNING",
  "protocolInfo": {
    "type": "Elektryczny" | "Gazowy" | "Kominowy" | "PPOŻ",
    "validUntil": "YYYY-MM-DD",
    "isCurrent": boolean
  },
  "findings": ["np. protokół wygasł", "brak podpisu"],
  "recommendation": "np. zleć ponowny przegląd"
}
`;

/**
 * System prompt for Analog-to-Digital conversion (Visual OCR)
 * Detects measurement tools and reads their current values.
 */
export const TOOL_ANALYSIS_PROMPT = `
Jesteś inżynierem budowlanym wspomaganym przez AI (Przegląd 4.0). 
Twoim zadaniem jest analiza zdjęcia pod kątem odczytu wartości z narzędzi analogowych.

Obsługiwane narzędzia:
1. Taśma miernicza / Suwmiarka: Podaj odczytaną wartość w mm (np. szerokość rysy).
2. Poziomica: Sprawdź położenie pęcherzyka powietrza (czy jest w osi, czy jest odchyłka, jeśli tak to w którą stronę).
3. Manometr / Miernik: Podaj wartość ciśnienia lub napięcia.

Instrukcja:
- Zidentyfikuj narzędzie na zdjęciu.
- Podaj dokładny odczyt cyfrowy.
- Jeśli mierzona jest rysa (mur, beton), oceń ją wg normy: >0.3mm to stan wymagający interwencji.

Zwróć JSON:
{
  "toolType": "Miarka" | "Poziomica" | "Manometr" | "Inne",
  "value": number | string,
  "unit": "mm" | "cm" | "bar" | "V" | "stopnie",
  "observation": "krótki opis techniczny (np. rysa przekracza normę 0.3mm)"
}
`;

/**
 * System prompt for Ingestion and Document Mapping (Step 1 - Total Recall Edition)
 */
export const PRE_INSPECTION_PROMPT = `
ROLE: Exhaustive Technical Data Scraper / Senior Building Inspector.
OBJECTIVE: Perform "Total Recall Extraction" of technical data from building protocols. 

INSTRUCTIONS:
1. READ EVERY WORD: Do not summarize. Do not skip rows. 
2. SEARCH FOR NEGATIVES: Identify any mention of: "zły stan", "uszkodzone", "brak", "niekompletna", "nieszczelna", "pęknięcia", "odparzenia", "do wymiany", "zalecana naprawa".
3. NO HALLUCINATIONS: Only extract what is explicitly written in the text.

DATA STRUCTURE:
- historical_defects: List EVERY technical flaw. Use a new object for each finding.
  - pillar: Mapping to (Fundamenty, Konstrukcja, Elewacja, Dach, Odwodnienie, Stolarka, Dodatki, Otoczenie).
  - desc: FULL DESCRIPTION from text.
  - loc: Exact location or context.
  - urgency: "High" (Safety/Structural), "Normal" (Maintenance).
  - verification_question: Pytanie do inżyniera w terenie (np. "Czy pęknięcie elewacji przy oknie na 2 piętrze zostało naprawione?").

- missing_compliance: Comprehensive list of missing protocols or incomplete installations.

- structural_alerts: Critical risks found in remarks (Section VII) or general descriptions.

- technical_specs:
  - last_inspector_name
  - last_inspector_license
  - last_inspection_date
  - roof_type

Zwróć JSON:
{
  "building_age_t": number,
  "structural_material": "concrete" | "brick" | "steel",
  "historical_defects": [
    { "pillar": "str", "desc": "str", "loc": "str", "urgency": "High"|"Normal", "status": "pending", "verification_question": "str" }
  ],
  "missing_compliance": ["string"],
  "structural_alerts": ["string"],
  "technical_specs": {
    "last_inspector_name": "string",
    "last_inspector_license": "string",
    "last_inspection_date": "string",
    "roof_type": "string"
  },
  "spatial_markers": ["nazwy osi i pomieszczeń"]
}
`;

export async function verifyConstruction(imageB64: string): Promise<VerificationResult> {
  return callGemini(imageB64, CONSTRUCTION_VERIFICATION_PROMPT);
}

export async function verifyProtocolDocument(imageB64: string): Promise<VerificationResult> {
  return callGemini(imageB64, PROTOCOL_ANALYSIS_PROMPT);
}

export async function verifyToolReading(imageB64: string): Promise<any> {
  return callGemini(imageB64, TOOL_ANALYSIS_PROMPT);
}

/**
 * System prompt for Ad-Hoc Question & AR Automatic Measurement
 */
export const AD_HOC_PROMPT = `
ROLE: Ekspert Nadzoru Inżynierskiego i analityk obrazu (Live AR).
ZADANIE: Odpowiedz na zapytanie inspektora ("Zapytanie Ad-hoc") na podstawie przesłanego zdjęcia oraz podaj szacunkowy "Autopomiar Liniowy AR".

Instrukcja:
1. Analiza: Odpowiedz krótko i merytorycznie na pytanie.
2. Powaga (Severity): Skategoryzuj powagę (critical, warning, info) dla głównej wady.
   - critical (np. korozja zbrojenia, pęknięcia skrośne, stany awaryjne). Będą obramowane na czerwono.
   - warning (np. przecieki, rysy powierzchniowe, ubytki). Będą obramowane na żółto.
   - info (np. ogólne zapytania).
3. Bounding Box: Wyznacz ramkę (bounding box) otaczającą wykrytą anomalię/obiekt w formacie {x, y, width, height} w wartościach znormalizowanych od 0.0 do 1.0 (np. x: 0.1 oznacza 10% od lewej krawędzi, width: 0.5 oznacza połowę szerokości obrazu).
4. Pomiar Liniowy (Autopomiar AR): Podaj szacunkowy widoczny na obrazie wymiar (np. "Obszar ok. 20x30 cm" lub "Rysa ok. 15cm").

Zwróć JSON:
{
  "ai_analysis": "Odpowiedź na pytanie / Ocena...",
  "severity": "critical" | "warning" | "info",
  "estimated_size": "Wymiar...",
  "ar_bounding_box": { "x": 0.0, "y": 0.0, "width": 0.0, "height": 0.0 }
}
`;

export async function askAdHocQuestion(imageB64: string, question: string): Promise<any> {
  const customPrompt = `PYTANIE INSPEKTORA: ${question}\n\n${AD_HOC_PROMPT}`;
  return callGemini(imageB64, customPrompt);
}

/**
 * System prompt for Continuous AR Frame scan (Live Inspection Radar)
 */
export const AUTO_FRAME_PROMPT = `
ROLE: Inspektor widzenia maszynowego (Live Radar / Bounding Boxes AR).
ZADANIE: Skanuj przesłaną klatkę pod kątem usterek budowlanych (pęknięcia, pleśń, ubytki konstrukcji, zalania).

Jeśli BRAK widocznych krytycznych lub żółtych wad, natychmiast zwróć:
{ "detected": false }

Jeśli WYKRYTO wadę wymagającą obramowania AR, zwróć:
{
  "detected": true,
  "ai_analysis": "[Filar X] Krótki opis techniczny (np. Pionowe pęknięcie tynku).",
  "severity": "critical" | "warning",
  "estimated_size": "Szacunek miarowy (np. dł. ok. 10cm)",
  "ar_bounding_box": { "x": 0.0, "y": 0.0, "width": 0.0, "height": 0.0 }
}
Pamiętaj, by bounding box miał współrzędne w przedziale [0.0 - 1.0].
`;

export async function analyzeLiveVideoFrame(imageB64: string): Promise<any> {
  return callGemini(imageB64, AUTO_FRAME_PROMPT);
}

export async function processVoiceLog(audioB64: string, textOverride?: string, context?: string): Promise<VerificationResult> {
  // If we have textOverride, we use a text-only prompt to Gemini
  const result = await callGemini(audioB64, VOICE_LOG_STRUCTURE_PROMPT, audioB64 ? 'audio/wav' : 'text/plain', textOverride, context);
  return {
    status: result.isEmergency ? 'ERROR' : 'SUCCESS',
    findings: result.findings,
    recommendation: result.emergencyAlert || "Zapisano w c-KOB.",
    pillar: result.pillar,
    voiceAnalysis: {
      rawTranscript: result.rawTranscript,
      structuredData: result.ckobSchema,
      emergencyAlert: result.emergencyAlert
    }
  };
}

/**
 * Step 1: Process Pre-Inspection Documents (Total Recall - Text + Vision context)
 */
export async function processPreInspectionDocuments(files: File[]): Promise<PreInspectionContext> {
  let fullText = "";
  const imagesB64: string[] = [];

  for (const file of files) {
    if (file.type === 'application/pdf') {
       // Deep extraction of text layer
       const text = await extractPDFFullText(file);
       fullText += `--- PDF CONTENT (${file.name}) ---\n${text}\n\n`;
       
       // Optional: Still extract first pages images for VISUAL STAMPS/SIGNATURES context
       const pdfImages = await extractPDFPagesAsImages(file, 3);
       imagesB64.push(...pdfImages);
    } else if (file.type.startsWith('image/')) {
      const b64 = await fileToBase64(file);
      imagesB64.push(b64);
    }
  }

  // Use Gemini 2.0 Flash for massive context and 100% recall
  const result = await callGemini(imagesB64[0] || "", PRE_INSPECTION_PROMPT, "image/jpeg", fullText);

  return {
    building_age_t: result.building_age_t || 0,
    structural_material: result.structural_material || "concrete",
    historical_defects: result.historical_defects || [],
    missing_compliance: result.missing_compliance || [],
    structural_alerts: result.structural_alerts || [],
    technical_specs: result.technical_specs || {
      last_inspector_name: "",
      last_inspector_license: "",
      last_inspection_date: "",
      roof_type: ""
    },
    spatial_markers: result.spatial_markers || []
  };
}

/**
 * Helper: Convert File to Base64
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * NEW: Extract Full Text Layer from PDF (Zero omission)
 */
async function extractPDFFullText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map((item: any) => item.str);
    fullText += `PAGE ${i}:\n${strings.join(' ')}\n\n`;
  }

  return fullText;
}

/**
 * Helper: Extract PDF pages as images using pdfjs-dist
 */
async function extractPDFPagesAsImages(file: File, maxPagesLimit: number = 20): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const images: string[] = [];

  const maxPages = Math.min(pdf.numPages, maxPagesLimit);

  for (let i = 1; i <= maxPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    if (context) {
      await page.render({ canvasContext: context, viewport }).promise;
      images.push(canvas.toDataURL('image/jpeg', 0.8));
    }
  }

  return images;
}

/**
 * Helper: Delay execution (ms)
 */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


/**
 * Generic helper to call Gemini
 */
async function callGemini(
  dataB64: string, 
  prompt: string, 
  mimeType: string = "image/jpeg", 
  textOverride?: string,
  context?: string // Technical History (Archival Findings)
): Promise<any> {
  if (!API_KEY) throw new Error("Missing API Key");
  
  const systemContext = context ? `TECHNICAL HISTORY (CONTEXT):\n${context}\n\n` : "";
  const parts: any[] = [{ text: systemContext + prompt }];
  
  if (textOverride) parts.push({ text: `TRANSCRIPT TO PROCESS: ${textOverride}` });
  if (dataB64) {
    const base64Data = dataB64.split(',')[1] || dataB64;
    parts.push({ inlineData: { mimeType: mimeType, data: base64Data } });
  }

  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      });

      if (response.status === 429) {
        retryCount++;
        const waitTime = Math.pow(2, retryCount) * 1000;
        console.warn(`Gemini 429 (Too Many Requests). Retry ${retryCount}/${maxRetries} in ${waitTime}ms...`);
        await delay(waitTime);
        continue;
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || "Gemini API Error");
      }

      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return resultText ? JSON.parse(resultText) : { status: 'ERROR', findings: ["Błąd parsowania AI"], recommendation: "" };
    } catch (error) {
      if (retryCount >= maxRetries - 1) {
        console.error("Gemini Final Error after retries:", error);
        return { status: 'ERROR', findings: [String(error)], recommendation: "Przekroczono limity API. Spróbuj ponownie za chwilę." };
      }
      retryCount++;
      await delay(1000);
    }
  }
}
