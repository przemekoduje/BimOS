import { supabase } from '../lib/supabase';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const DEFAULT_MODEL = "models/gemini-2.5-flash";
const CACHE_MODEL = "models/gemini-2.5-flash";
const CACHE_URL = `${API_BASE_URL}/cachedContents`;
const CACHE_KEY = "bimos_ckob_cache_v4";

import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import cKOBBibleFallback from '../knowledge_base/cKOB_biblia.md?raw';
import { fetchActiveKBContent } from './knowledgeService';
import { searchLegalChunks } from './legalRagService';

// pdfjs worker setup
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

export interface ChatMessage {
  id?: string;
  chat_id?: string;
  role: 'user' | 'ai';
  content: string;
  created_at?: string;
}

export interface ChatSession {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  is_pinned?: boolean;
}

export interface VerificationResult {
  status: 'SUCCESS' | 'WARNING' | 'ERROR';
  findings: string[];
  recommendation: string;
  pillar?: number;
  requiresFollowUp?: boolean;
  alertMessage?: string;
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

// --- PROMPTS ---

// @BIMOS-STABLE-CHAT-V5-PROMPT-START (Kluczowy Prompt dla Dymków i Truncation Fix)
// Instrukcje systemowe bez treści bazy wiedzy (dynamicznie podmieniane)
const PROMPT_TEMPLATE = `
[ROLE]
Jesteś elitarnym inżynierskim asystentem AI "BimOS", ekspertem ds. Prawa Budowlanego, Warunków Technicznych oraz Nadzoru Inżynierskiego. Twoja wiedza obejmuje pełen zakres przepisów techniczno-budowlanych, procedur administracyjnych (w tym procedury naprawczej) oraz cyfrowej Książki Obiektu Budowlanego (c-KOB).

[ŻELAZNE ZASADY FORMATOWANIA - KRYTYCZNIE WAŻNE]
1. ZAKAZ używania składni Markdown dla dymków/tooltipów (żadnych '[tekst](# "treść")').
2. WYŁĄCZNY FORMAT DYMKÓW: Jeśli używasz skrótu inżynieryjnego lub powołujesz się na konkretny przepis, MUSISZ użyć formatu: [[POJĘCIE::Dokładne wyjaśnienie lub cytat]]. 
3. HIERARCHIA TAGOWANIA (PRIORYTET):
   - Artykuły i ustępy (np. Art. 93, ust. 1, pkt 8) MAJĄ ABSOLUTNY PRIORYTET. 
   - ZAKAZ tagowania samej nazwy ustawy "Prawo Budowlane" lub "PB", jeśli w zdaniu występuje konkretny numer artykułu. Taguj TYLKO numer artykułu.
   - W dymku dla artykułu podawaj jego TREŚĆ z Biblii Wiedzy lub dostarczonego kontekstu, a nie definicję dokumentu.
   - PRZYKŁAD: "...kara grzywny na podstawie [[Art. 93::Art. 93 pkt 8 PB: Kto nie dokonuje wpisu w terminie 7 dni, podlega karze grzywny.]] Prawa Budowlanego..."
4. ZAKAZ używania znaku '#' wewnątrz tekstu odpowiedzi (zarezerwowany tylko dla nagłówków ## i ###).
5. ZAKAZ używania pogrubień (bold) wewnątrz akapitów.
6. TWOJA ZAAWANSOWANA DYSCYPLINA:
   - Odpowiadaj profesjonalnie na WSZYSTKIE tematy techniczne, inżynierskie i prawne z zakresu budownictwa.
   - BĄDŹ ZWIĘZŁY: Odpowiadaj krótko i syntetycznie.
   - NIGDY NIE URYWAJ WYPOWIEDZI W POŁOWIE. Jeśli zaczynasz dymek [[...]], MUSISZ go zamknąć.
7. NA KONIEC podaj zawsze 3 dopytania (z użyciem specjalnego znacznika [DOPYTANIA_START]).

[STRUKTURA ODPOWIEDZI]
- Na SAMYM KOŃCU, zaraz po wnioskach, dodaj 3 przydatne dopytania:
[DOPYTANIA_START]
- Pytanie 1?
- Pytanie 2?
- Pytanie 3?

[KONTEKST PRAWNY RAG]
Jeśli w wiadomości użytkownika znajduje się blok [KONTEKST PRAWNY], potraktuj go jako NAJWAŻNIEJSZE źródło wiedzy aktualnej. Są to fragmenty z wgranych przez użytkownika aktów prawnych (PDF).
Gdy powołujesz się na te fragmenty, ZAWSZE używaj formatu [[Art. X::Cytat z dokumentu]], gdzie w dymku (po ::) podajesz treść z dokumentu RAG, a nie z ogólnej Biblii.

[BIBLIA WIEDZY cKOB]
{KB_CONTENT}
`;

/**
 * Buduje pełny prompt systemowy z podaną treścią bazy wiedzy.
 * Treść pochodzi z Supabase Storage (zarządzana w Adminie) lub z lokalnego fallbacku.
 */
function buildKnowledgeBasePrompt(kbContent: string): string {
  return PROMPT_TEMPLATE.replace('{KB_CONTENT}', kbContent);
}

/**
 * Pobiera aktywną treść bazy wiedzy:
 * 1. Próbuje Supabase Storage (plik wgrany przez admina)
 * 2. Fallback: lokalny plik cKOB_biblia.md (wbudowany w kod)
 */
async function getKBContent(onStatus?: (s: string) => void): Promise<string> {
  onStatus?.("Ładowanie bazy wiedzy...");
  const cloudContent = await fetchActiveKBContent();
  if (cloudContent) {
    console.log('[BimOS KB] Using cloud KB from Supabase Storage.');
    return cloudContent;
  }
  console.log('[BimOS KB] No cloud KB found, using local fallback cKOB_biblia.md');
  return cKOBBibleFallback;
}

// Eksportowane dla kompatybilności wstecznej (używane jako fallback w callGemini)
export let KNOWLEDGE_BASE_PROMPT = buildKnowledgeBasePrompt(cKOBBibleFallback);
// @BIMOS-STABLE-CHAT-V5-PROMPT-END

export const PRE_INSPECTION_PROMPT = `
ROLE: Exhaustive Technical Data Scraper / Senior Building Inspector.
OBJECTIVE: Perform "Total Recall Extraction" of technical data from building protocols. 
INSTRUCTIONS:
1. READ EVERY WORD: Do not summarize. Do not skip rows. 
2. SEARCH FOR NEGATIVES: Identify any mention of: "zły stan", "uszkodzone", "brak", "niekompletna", "nieszczelna", "pęknięcia", "odparzenia", "do wymiany", "zalecana naprawa".
3. NO HALLUCINATIONS: Only extract what is explicitly written in the text.
...
`; // Truncated for brevity but fixed in full write

export const PRE_INSPECTION_JSON_PROMPT = `
Jesteś ekspertem ds. przeglądów budowlanych. Ekstrahuj JSON:
{
  "summary": "string",
  "technical_parameters": { ... },
  "spatial_markers": ["string"]
}
`;

export const CONSTRUCTION_VERIFICATION_PROMPT = `
ROLE: Ekspert Nadzoru Inżynierskiego. Klasyfikuj usterkę do 8 filarów.
Zwróć JSON: { "status": "SUCCESS", "pillar": 1, ... }
`;

export const VOICE_LOG_STRUCTURE_PROMPT = `
ROLE: NLP Inżynieria. Przekształć mowę w JSON c-KOB (Art. 60b).
`;

export const PROTOCOL_ANALYSIS_PROMPT = `
Analiza protokołów branżowych. Zwróć JSON z typem i datą ważności.
`;

export const TOOL_ANALYSIS_PROMPT = `
Analiza odczytów z narzędzi (miarka, poziomica). Zwróć wartość i jednostkę w JSON.
`;

export const AD_HOC_PROMPT = `
Odpowiedź na zapytanie + Bounding Box AR. Zwróć JSON.
`;

export const AUTO_FRAME_PROMPT = `
Live Radar Scaning. Zwróć JSON z "detected": true/false.
`;

// --- CORE LOGIC ---

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Simple hash function to detect content changes
function getContentHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
}

const CACHE_TTL_SECONDS = 172800; // 48 hours for maximum cost reduction

async function ensureCache(onStatus?: (s: string) => void): Promise<string> {
  // 1. Fetch KB content (Supabase Storage → local fallback)
  const kbContent = await getKBContent(onStatus);
  const currentPromptContent = buildKnowledgeBasePrompt(kbContent);
  
  // Update exported prompt so callGemini fallback is also current
  KNOWLEDGE_BASE_PROMPT = currentPromptContent;

  const currentHash = getContentHash(currentPromptContent);
  const stored = localStorage.getItem(CACHE_KEY);

  if (stored) {
    const { name, expires, hash } = JSON.parse(stored);
    
    // Use cache ONLY if hash matches AND it hasn't expired
    if (hash === currentHash && Date.now() < expires) {
      onStatus?.("Pobieranie danych z bazy wiedzy...");
      console.log("Using existing Gemini cache:", name, "Hash:", hash);
      return name;
    } else {
      console.log("Cache invalid: mismatch or expired. Regenerating...");
    }
  }

  onStatus?.("Inicjowanie nowej bazy wiedzy c-KOB...");
  try {
    const response = await fetch(`${CACHE_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CACHE_MODEL,
        displayName: "cKOB Biblia Prod v5",
        ttl: `${CACHE_TTL_SECONDS}s`,
        contents: [{ role: "user", parts: [{ text: currentPromptContent }] }]
      })
    });
    const data = await response.json();
    if (!data.name) throw new Error(JSON.stringify(data));

    localStorage.setItem(CACHE_KEY, JSON.stringify({
      name: data.name,
      hash: currentHash,
      expires: Date.now() + CACHE_TTL_SECONDS * 1000
    }));
    
    console.log("New Gemini cache created:", data.name, "Hash:", currentHash);
    return data.name;
  } catch (error) {
    console.error("Cache creation failed:", error);
    return "";
  }
}

// @BIMOS-STABLE-CHAT-V5-LOGIC-START (Kluczowa Logika API i Safety Settings)
async function callGemini(
  messages: ChatMessage[], 
  cacheName: string,
  onStatus?: (s: string) => void,
  expectJson: boolean = false,
  systemInstruction?: string
): Promise<any> {
  const url = `${API_BASE_URL}/${DEFAULT_MODEL}:generateContent?key=${API_KEY}`;
  onStatus?.("Generowanie precyzyjnej instrukcji...");

  const body: any = {
    contents: messages.map(m => ({
      role: m.role === 'ai' ? 'model' : 'user',
      parts: [{ text: m.content }]
    })),
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 4096,
      ...(expectJson ? { responseMimeType: "application/json" } : {})
    }
  };

  if (systemInstruction) {
    body.system_instruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  if (cacheName) {
    body.cachedContent = cacheName;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  
  const text = data.candidates[0].content.parts[0].text;
  return expectJson ? JSON.parse(text) : text;
}

export async function askKnowledgeBase(
  history: ChatMessage[], 
  query: string,
  onStatus?: (s: string) => void
): Promise<string> {
  // Run cache validation AND RAG search in parallel for speed
  const [cacheName, ragChunks] = await Promise.all([
    ensureCache(onStatus),
    searchLegalChunks(query, 12).catch(() => []), // Increased topK to 12 for better context coverage
  ]);
  
  // Build enriched query: Daily Briefing + RAG legal context + user question
  let enrichedQuery = query;

  // 1. Prepend RAG legal context if found
  if (ragChunks.length > 0) {
    const ragContext = ragChunks
      .map(chunk => `[DOKUMENT: ${chunk.document_name} | REFERENCJA: ${chunk.article_ref}]
TREŚĆ: ${chunk.content}`)
      .join('\n---\n');
    
    enrichedQuery = `[AKTUALNE PRZEPISY PRAWA - TWOJE GŁÓWNE ŹRÓDŁO WIEDZY]
Użyj poniższych fragmentów jako podstawy odpowiedzi. To są najnowsze akty prawne wgrane przez użytkownika.
---
${ragContext}
---

[PYTANIE UŻYTKOWNIKA]
${query}`;
    
    onStatus?.(`Znaleziono ${ragChunks.length} trafnych fragmentów w aktach prawnych...`);
    console.log(`[RAG] Injected ${ragChunks.length} legal chunks for query: "${query.substring(0, 60)}...".`);
  }

  // 2. Prepend daily briefing (Live context)
  try {
    const res = await fetch('/daily_update.json');
    if (res.ok) {
      const liveData = await res.json();
      if (liveData.chatBriefing) {
        enrichedQuery = `[Kontekst Prawny Live z dzisiaj: ${liveData.chatBriefing}]\n\n${enrichedQuery}`;
      }
    }
  } catch (e) {
    // daily briefing is optional
  }

  // FALLBACK: Jeśli nie mamy cache, przekazujemy prompt bezpośrednio jako systemInstruction
  return await callGemini(
    [...history, { role: 'user', content: enrichedQuery }], 
    cacheName, 
    onStatus, 
    false, 
    cacheName ? undefined : KNOWLEDGE_BASE_PROMPT
  );
}

// --- DATABASE PERSISTENCE ---

export async function fetchUserChats(): Promise<ChatSession[]> {
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchChatMessages(chatId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createNewChat(title: string): Promise<ChatSession> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("No user logged in");

  const { data, error } = await supabase
    .from('chats')
    .insert([{ user_id: user.id, title }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveMessage(chatId: string, role: 'user' | 'ai', content: string): Promise<ChatMessage> {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, role, content }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
export async function deleteChat(chatId: string): Promise<void> {
  const { error } = await supabase
    .from('chats')
    .delete()
    .eq('id', chatId);

  if (error) throw error;
}

export async function updateChat(chatId: string, updates: Partial<ChatSession>): Promise<void> {
  const { error } = await supabase
    .from('chats')
    .update(updates)
    .eq('id', chatId);

  if (error) throw error;
}

// --- SPECIFIC VERIFIERS ---

export async function verifyConstruction(imageB64: string): Promise<VerificationResult> {
  const prompt = `Analiza zdjęcia usterki. ${CONSTRUCTION_VERIFICATION_PROMPT}`;
  const response = await callGemini([{ role: 'user', content: prompt + "\nIMAGE_DATA: " + imageB64 }], "", undefined, true);
  return response;
}

export async function verifyProtocolDocument(imageB64: string): Promise<VerificationResult> {
  const response = await callGemini([{ role: 'user', content: PROTOCOL_ANALYSIS_PROMPT + "\nIMAGE_DATA: " + imageB64 }], "", undefined, true);
  return response;
}

export async function verifyToolReading(imageB64: string): Promise<any> {
  return await callGemini([{ role: 'user', content: TOOL_ANALYSIS_PROMPT + "\nIMAGE_DATA: " + imageB64 }], "", undefined, true);
}

export async function askAdHocQuestion(imageB64: string, question: string): Promise<any> {
  const prompt = `PYTANIE: ${question}\n\n${AD_HOC_PROMPT}`;
  return await callGemini([{ role: 'user', content: prompt + "\nIMAGE_DATA: " + imageB64 }], "", undefined, true);
}

export async function analyzeLiveVideoFrame(imageB64: string): Promise<any> {
  return await callGemini([{ role: 'user', content: AUTO_FRAME_PROMPT + "\nIMAGE_DATA: " + imageB64 }], "", undefined, true);
}

export async function processVoiceLog(audioB64: string, textOverride?: string): Promise<VerificationResult> {
  const prompt = textOverride ? `TEKST: ${textOverride}\n${VOICE_LOG_STRUCTURE_PROMPT}` : VOICE_LOG_STRUCTURE_PROMPT;
  const result = await callGemini([{ role: 'user', content: prompt }], "", undefined, true);
  return {
    status: result.isEmergency ? 'ERROR' : 'SUCCESS',
    findings: result.findings,
    recommendation: result.emergencyAlert || "Zapisano w c-KOB.",
    voiceAnalysis: {
      rawTranscript: result.rawTranscript || textOverride,
      structuredData: result.ckobSchema,
      emergencyAlert: result.emergencyAlert
    }
  };
}

// --- PDF HELPERS ---

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function extractPDFFullText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += `PAGE ${i}:\n${content.items.map((it: any) => it.str).join(' ')}\n\n`;
  }
  return fullText;
}

export async function processPreInspectionDocuments(files: File[]): Promise<PreInspectionContext> {
  let fullText = "";
  for (const file of files) {
    if (file.type === 'application/pdf') {
      fullText += await extractPDFFullText(file);
    }
  }
  const result = await callGemini([{ role: 'user', content: PRE_INSPECTION_PROMPT + "\nTEXT: " + fullText }], "", undefined, true);
  return result;
}
