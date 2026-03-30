/**
 * AI Service for Gemini integration
 * @author Senior Dev
 */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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

export async function verifyConstruction(imageB64: string): Promise<VerificationResult> {
  return callGemini(imageB64, CONSTRUCTION_VERIFICATION_PROMPT);
}

export async function verifyProtocolDocument(imageB64: string): Promise<VerificationResult> {
  return callGemini(imageB64, PROTOCOL_ANALYSIS_PROMPT);
}

export async function verifyToolReading(imageB64: string): Promise<any> {
  return callGemini(imageB64, TOOL_ANALYSIS_PROMPT);
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
    parts.push({ inline_data: { mime_type: mimeType, data: base64Data } });
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { response_mime_type: "application/json" }
      }),
    });

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return resultText ? JSON.parse(resultText) : { status: 'ERROR', findings: ["Błąd parsowania AI"], recommendation: "" };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { status: 'ERROR', findings: [String(error)], recommendation: "" };
  }
}
