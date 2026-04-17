import { supabase } from '../lib/supabase';
import { incrementAiUsage, getAiMonitoringStats } from './aiService';
import * as pdfjsLib from 'pdfjs-dist';
// @ts-ignore
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const EMBEDDING_MODEL = "gemini-embedding-001";
const EMBEDDING_URL = `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent?key=${GEMINI_API_KEY}`;


// ---------- TYPES ----------

export interface LegalDocument {
  id: string;
  name: string;
  filename: string;
  storage_path: string;
  category: string;
  chunk_count: number;
  is_active: boolean;
  created_at: string;
}

export interface IngestionProgress {
  stage: 'error' | 'uploading' | 'extracting' | 'chunking' | 'embedding' | 'saving' | 'done' | 'downloading';
  message: string;
  page?: number;
  totalPages?: number;
  chunk?: number;
  totalChunks?: number;
}

export interface LegalChunkResult {
  id: string;
  content: string;
  article_ref: string;
  document_name: string;
  similarity: number;
}

export type LegalCategory =
  | 'budowlane'
  | 'planowanie'
  | 'ppoz'
  | 'ochrona_srodowiska'
  | 'techniczno_budowlane'
  | 'inne';

export const LEGAL_CATEGORIES: Record<LegalCategory, string> = {
  budowlane: 'Prawo Budowlane',
  planowanie: 'Planowanie Przestrzenne',
  ppoz: 'Przepisy Pożarowe',
  ochrona_srodowiska: 'Ochrona Środowiska',
  techniczno_budowlane: 'Warunki Techniczne',
  inne: 'Inne',
};

// ---------- EMBEDDING ----------

/**
 * Generates a 768-dimensional embedding vector using Gemini text-embedding-004.
 */
export async function embedText(text: string): Promise<number[]> {
  const stats = getAiMonitoringStats();
  if (stats.isAiDisabled) {
    throw new Error("Generowanie wektorów (RAG) jest obecnie wyłączone (Kill-switch).");
  }

  try {
    const response = await fetch(EMBEDDING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: { parts: [{ text: text.substring(0, 8192) }] },
        output_dimensionality: 768, // Crucial: match Supabase vector(768)
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // If 404, try falling back to v1beta or another model if needed, 
      // but for now let's use the most stable v1/004 combo
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    // Track usage
    incrementAiUsage('rag', 'Text-Embedding-004');
    
    if (!data.embedding?.values) {
      throw new Error(`Invalid embedding format: ${JSON.stringify(data)}`);
    }
    return data.embedding.values as number[];
  } catch (err: any) {
    console.error('[EMBED] Error:', err);
    throw err;
  }
}

// ---------- PDF EXTRACTION ----------

/**
 * Extracts plain text from a PDF file using pdfjs-dist.
 * Final ultra-robust version with deep debugging and FileReader fallback.
 */
export async function extractTextFromPDF(
  file: File,
  onProgress?: (page: number, total: number) => void
): Promise<string> {
  // Pre-check for weird empty files
  if (file.size === 0) {
    throw new Error('Wybrany plik jest pusty (0 bajtów). Sprawdź plik na dysku.');
  }

  // Reliable file reading via FileReader (often more stable than file.arrayBuffer())
  const arrayBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Błąd odczytu pliku z dysku.'));
    reader.readAsArrayBuffer(file);
  });

  console.log(`[RAG PDF] File: ${file.name}, Reliable size: ${arrayBuffer.byteLength} bytes`);

  if (arrayBuffer.byteLength === 0) {
    throw new Error('Błąd krytyczny: Otrzymano 0 bajtów po odczycie pliku. Spróbuj skopiować plik w inne miejsce i wgrać ponownie.');
  }

  // Ensure worker is set (CDN fallback for reliability)
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;
  }

  try {
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      verbosity: 0,
    } as any);

    const pdf = await loadingTask.promise;
    const totalPages = pdf.numPages;
    const pageTexts: string[] = [];

    console.log(`[RAG PDF] PDF initialized successfully. Pages: ${totalPages}`);

    for (let i = 1; i <= totalPages; i++) {
      onProgress?.(i, totalPages);
      try {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Extract everything including potential Polish chars
        const pageRawText = textContent.items
          .map((item: any) => item.str || '')
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (pageRawText) {
          pageTexts.push(pageRawText);
          if (i === 1) console.log(`[RAG PDF] Page 1 sample: ${pageRawText.substring(0, 100)}`);
        }
      } catch (pageErr) {
        console.warn(`[RAG PDF] Skipping page ${i} due to error:`, pageErr);
      }
    }

    const fullText = pageTexts.join('\n\n');
    console.log(`[RAG PDF] Final character count: ${fullText.length}`);

    if (fullText.length < 10) {
      throw new Error(
        `Odczytano ${totalPages} stron, ale nie znaleziono na nich tekstu. ` +
        `Upewnij się, że PDF nie jest skanem bez warstwy tekstowej.`
      );
    }

    return fullText;
  } catch (err: any) {
    console.error('[RAG PDF] Fatal Error:', err);
    throw new Error(`Błąd PDF: ${err.message}`);
  }
}

// ---------- TEXT CHUNKING ----------

/**
 * Splits legal document text into semantic chunks.
 * Respects Polish legal article markers: "Art. X.", "§ X.", "Rozdział X".
 * Each chunk is 400-600 words with article reference extracted.
 */
export function chunkLegalText(
  fullText: string,
  docName: string
): Array<{ content: string; articleRef: string; chunkIndex: number }> {
  const CHUNK_TARGET_WORDS = 450;
  const CHUNK_OVERLAP_WORDS = 50;

  // Polish legal structure markers
  const ARTICLE_PATTERN =
    /(?:^|\n)(Art\.\s*\d+[a-z]?\.?|§\s*\d+\.?|Rozdział\s+[IVXLCDM\d]+\.?|DZIAŁ\s+[IVXLCDM]+\.?)/gm;

  const chunks: Array<{ content: string; articleRef: string; chunkIndex: number }> = [];

  // Find all article break points
  const breaks: Array<{ index: number; ref: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = ARTICLE_PATTERN.exec(fullText)) !== null) {
    breaks.push({ index: match.index, ref: match[1].trim() });
  }

  if (breaks.length === 0) {
    // No structure detected → split by word count
    const words = fullText.split(/\s+/);
    let idx = 0;
    let chunkIndex = 0;
    while (idx < words.length) {
      const chunk = words.slice(idx, idx + CHUNK_TARGET_WORDS).join(' ');
      chunks.push({
        content: chunk,
        articleRef: `${docName} — fragment ${chunkIndex + 1}`,
        chunkIndex,
      });
      idx += CHUNK_TARGET_WORDS - CHUNK_OVERLAP_WORDS;
      chunkIndex++;
    }
    return chunks;
  }

  // Split by article markers, then group into ±CHUNK_TARGET_WORDS word chunks
  let currentWords: string[] = [];
  let currentRef = breaks[0]?.ref || docName;
  let chunkIndex = 0;

  const flushChunk = (ref: string) => {
    if (currentWords.length === 0) return;
    chunks.push({
      content: currentWords.join(' '),
      articleRef: ref,
      chunkIndex: chunkIndex++,
    });
    // Keep overlap for next chunk
    currentWords = currentWords.slice(-CHUNK_OVERLAP_WORDS);
  };

  for (let i = 0; i < breaks.length; i++) {
    const start = breaks[i].index;
    const end = breaks[i + 1]?.index ?? fullText.length;
    const sectionText = fullText.slice(start, end).trim();
    const sectionWords = sectionText.split(/\s+/);

    for (const word of sectionWords) {
      if (!word.trim()) continue; // Skip empty parts to avoid Gemini 400
      currentWords.push(word);
      if (currentWords.length >= CHUNK_TARGET_WORDS) {
        flushChunk(breaks[i].ref);
      }
    }
    currentRef = breaks[i].ref;
  }

  // Flush remaining words
  if (currentWords.length > 20) {
    flushChunk(currentRef);
  }

  return chunks;
}

// ---------- INGESTION PIPELINE ----------

/**
 * Full ingestion pipeline for a legal document PDF.
 */
export async function uploadLegalDocument(
  file: File,
  name: string,
  category: LegalCategory,
  onProgress?: (p: IngestionProgress) => void
): Promise<LegalDocument> {
  onProgress?.({ stage: 'uploading', message: 'Inicjowanie i przygotowanie bufora...' });
  
  // 1. Read file into buffer ONCE to share between PDF.js and Supabase
  const arrayBuffer = await file.arrayBuffer();
  const fileData = new Uint8Array(arrayBuffer);
  console.log(`[INGEST] File: ${file.name}, Data size: ${fileData.length} bytes`);

  if (fileData.length === 0) {
    throw new Error('Błąd: Plik wydaje się być pusty (0 bajtów).');
  }

  // 2. Upload to Storage (using the buffer, not the File object)
  onProgress?.({ stage: 'uploading', message: 'Przesyłanie PDF do chmury...' });
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `legal/${timestamp}_${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('knowledge-bases')
    .upload(storagePath, fileData, { 
      upsert: false, 
      contentType: 'application/pdf' 
    });

  if (uploadError) throw new Error(`Storage upload failed: ${uploadError.message}`);

  // 3. Insert initial record (to get an ID)
  const { data: docRecord, error: docError } = await supabase
    .from('legal_documents')
    .insert([{ name, filename: file.name, storage_path: storagePath, category, is_active: true }])
    .select()
    .single();

  if (docError || !docRecord) {
    await supabase.storage.from('knowledge-bases').remove([storagePath]);
    throw new Error(`DB insert failed: ${docError?.message}`);
  }

  // 4. Index the content
  try {
    return await processLegalDocumentContent(docRecord, fileData, onProgress);
  } catch (error) {
    // If indexing fails, we keep the record but with 0 count (can be repaired later)
    console.error('[INGEST] Indexing failed, but file is in storage:', error);
    throw error;
  }
}

export async function processLegalDocumentContent(
  docRecord: LegalDocument,
  fileData: ArrayBuffer | Uint8Array,
  onProgress?: (progress: IngestionProgress) => void,
  force: boolean = false
): Promise<LegalDocument> {
  // Check if already indexed to prevent accidental costs
  if (!force && docRecord.chunk_count > 0) {
    console.log(`[INGEST] Document ${docRecord.name} already has ${docRecord.chunk_count} chunks. Skipping re-index.`);
    onProgress?.({ stage: 'done', message: 'Dokument jest już zaindeksowany. Użyj wymuszenia (force), aby nadpisać.' });
    return docRecord;
  }

  // 1. Text extraction
  onProgress?.({ stage: 'extracting', message: 'Ekstrakcja tekstu z PDF...' });
  
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs`;
  }

  const loadingData = fileData instanceof Uint8Array ? fileData : new Uint8Array(fileData);

  const loadingTask = pdfjsLib.getDocument({
    data: loadingData,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
    cMapPacked: true,
    verbosity: 0,
  } as any);

  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let i = 1; i <= totalPages; i++) {
    onProgress?.({ 
      stage: 'extracting', 
      message: `Czytanie strony ${i} z ${totalPages}...`,
      page: i,
      totalPages 
    });
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item: any) => (item as any).str || '')
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    if (text) pageTexts.push(text);
  }

  const fullText = pageTexts.join('\n\n');
  if (fullText.length < 50) {
    console.warn(`[INGEST] Warning: Only ${fullText.length} chars extracted.`);
  }

  // 2. Chunking
  onProgress?.({ stage: 'chunking', message: 'Dzielenie na fragmenty...' });
  const rawChunks = chunkLegalText(fullText, docRecord.name);
  
  // Filter out any empty chunks that would cause Gemini "empty Part" errors
  const chunks = rawChunks.filter(c => c.content && c.content.trim().length > 0);
  console.log(`[INGEST] Removed ${rawChunks.length - chunks.length} empty chunks. Final: ${chunks.length}`);

  if (chunks.length === 0) {
    throw new Error('Nie udało się podzielić tekstu na sensowne fragmenty. Sprawdź zawartość pliku.');
  }

  // 3. Clear existing chunks if any (for re-indexing)
  await supabase.from('legal_chunks').delete().eq('document_id', docRecord.id);

  // 4. Embedding generation
  const BATCH_SIZE = 5;
  const allChunkRows: any[] = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    onProgress?.({
      stage: 'embedding',
      message: `Generowanie wektorów ${i + 1}–${Math.min(i + BATCH_SIZE, chunks.length)} z ${chunks.length}...`,
      chunk: i,
      totalChunks: chunks.length,
    });

    const batchRows = await Promise.all(
      batch.map(async (chunk) => {
        const embedding = await embedText(chunk.content);
        return {
          document_id: docRecord.id,
          chunk_index: chunk.chunkIndex,
          content: chunk.content,
          article_ref: chunk.articleRef,
          embedding: embedding,
        };
      })
    );
    allChunkRows.push(...batchRows);
  }

  // 5. Save chunks to DB
  onProgress?.({ stage: 'saving', message: `Zapisywanie ${allChunkRows.length} fragmentów...` });

  const SAVE_BATCH_SIZE = 50; 
  for (let i = 0; i < allChunkRows.length; i += SAVE_BATCH_SIZE) {
    const batch = allChunkRows.slice(i, i + SAVE_BATCH_SIZE);
    const { error: chunkError } = await supabase.from('legal_chunks').insert(batch);
    if (chunkError) throw new Error(`Chunk insert failed: ${chunkError.message}`);
  }

  // 6. Update doc status
  const { data: updatedDoc, error: updateError } = await supabase
    .from('legal_documents')
    .update({ chunk_count: allChunkRows.length })
    .eq('id', docRecord.id)
    .select()
    .single();

  if (updateError) throw updateError;

  onProgress?.({
    stage: 'done',
    message: `Gotowe! Zaindeksowano ${allChunkRows.length} fragmentów.`,
    totalChunks: allChunkRows.length,
  });

  return updatedDoc;
}

/**
 * Downloads an existing PDF from storage and re-indexes it.
 */
export async function reindexLegalDocument(
  doc: LegalDocument,
  onProgress?: (progress: { stage: string; message: string }) => void
): Promise<LegalDocument> {
  onProgress?.({ stage: 'downloading', message: 'Pobieranie pliku z chmury...' });
  
  const { data, error } = await supabase.storage
    .from('knowledge-bases')
    .download(doc.storage_path);

  if (error || !data) {
    throw new Error(`Failed to download file: ${error?.message || 'No data'}`);
  }

  const buffer = await data.arrayBuffer();
  return processLegalDocumentContent(doc, buffer, onProgress as any, true); // reindex intentionally forces it
}

// ---------- SEARCH ----------

/**
 * Semantic search across all active legal documents.
 * Returns top-K most relevant chunks via pgvector cosine similarity.
 */
export async function searchLegalChunks(
  query: string,
  topK: number = 12,
  category?: LegalCategory
): Promise<LegalChunkResult[]> {
  try {
    const queryEmbedding = await embedText(query);

    const { data, error } = await supabase.rpc('search_legal_chunks', {
      query_embedding: queryEmbedding, // Send as native array
      match_count: topK,
      filter_category: category || null,
    });

    if (error) {
      console.warn('[RAG] Search failed:', error.message);
      return [];
    }

    return (data || []) as LegalChunkResult[];
  } catch (e) {
    console.warn('[RAG] searchLegalChunks error:', e);
    return [];
  }
}

// ---------- CRUD ----------

export async function fetchLegalDocuments(): Promise<LegalDocument[]> {
  const { data, error } = await supabase
    .from('legal_documents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function toggleLegalDocActive(id: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('legal_documents')
    .update({ is_active: isActive })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteLegalDocument(id: string, storagePath: string): Promise<void> {
  // Delete chunks first (CASCADE handles it too, but explicit is safer)
  await supabase.from('legal_chunks').delete().eq('document_id', id);
  // Delete from storage
  await supabase.storage.from('knowledge-bases').remove([storagePath]);
  // Delete document record
  const { error } = await supabase.from('legal_documents').delete().eq('id', id);
  if (error) throw error;
}
