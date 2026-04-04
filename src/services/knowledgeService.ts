import { supabase } from '../lib/supabase';

const KB_CONTENT_CACHE_KEY = 'bimos_kb_content_cache';

export interface KnowledgeBase {
  id: string;
  name: string;
  filename: string;
  storage_path: string;
  version: string;
  description: string;
  is_active: boolean;
  updated_at: string;
}

export async function fetchKnowledgeBases(): Promise<KnowledgeBase[]> {
  const { data, error } = await supabase
    .from('knowledge_bases')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function uploadKnowledgeBase(
  file: File,
  name: string,
  version: string,
  description: string
): Promise<KnowledgeBase> {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `${timestamp}_${safeName}`;

  // 1. Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('knowledge-bases')
    .upload(storagePath, file, { upsert: false, contentType: file.type || 'text/plain' });

  if (uploadError) throw uploadError;

  // 2. Insert metadata record
  const { data, error: dbError } = await supabase
    .from('knowledge_bases')
    .insert([{
      name,
      filename: file.name,
      storage_path: storagePath,
      version,
      description,
      is_active: true,
    }])
    .select()
    .single();

  if (dbError) throw dbError;
  return data;
}

export async function getDownloadUrl(storagePath: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('knowledge-bases')
    .createSignedUrl(storagePath, 60); // URL valid for 60 seconds

  if (error) throw error;
  return data.signedUrl;
}

export async function toggleKnowledgeBaseActive(id: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('knowledge_bases')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) throw error;
}

export async function deleteKnowledgeBase(id: string, storagePath: string): Promise<void> {
  // 1. Remove from storage
  await supabase.storage.from('knowledge-bases').remove([storagePath]);

  // 2. Remove from DB
  const { error } = await supabase.from('knowledge_bases').delete().eq('id', id);
  if (error) throw error;
}

export async function getLatestUpdateDate(): Promise<string | null> {
  const { data, error } = await supabase
    .from('knowledge_bases')
    .select('updated_at')
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data.updated_at;
}

/**
 * Fetches the content of the most recently updated active knowledge base.
 * Uses a localStorage cache keyed by `updated_at` to avoid re-downloading
 * on every request. Falls back gracefully to null if Supabase is unavailable.
 */
export async function fetchActiveKBContent(): Promise<string | null> {
  try {
    // 1. Get the most recent active KB record from DB (lightweight query)
    const { data, error } = await supabase
      .from('knowledge_bases')
      .select('id, storage_path, updated_at')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return null;

    // 2. Check if we already have this version in localStorage
    const cached = localStorage.getItem(KB_CONTENT_CACHE_KEY);
    if (cached) {
      const { updatedAt, content } = JSON.parse(cached);
      if (updatedAt === data.updated_at && content) {
        console.log('[BimOS KB] Using locally cached KB content, version:', updatedAt);
        return content;
      }
    }

    // 3. Fetch updated file content from Supabase Storage
    console.log('[BimOS KB] Fetching fresh KB content from Storage:', data.storage_path);
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from('knowledge-bases')
      .download(data.storage_path);

    if (downloadError || !fileBlob) {
      console.warn('[BimOS KB] Storage download failed:', downloadError);
      return null;
    }

    const content = await fileBlob.text();

    // 4. Cache in localStorage for future requests (until KB changes)
    localStorage.setItem(KB_CONTENT_CACHE_KEY, JSON.stringify({
      updatedAt: data.updated_at,
      content
    }));

    console.log('[BimOS KB] Fresh KB content cached locally. Length:', content.length);
    return content;
  } catch (e) {
    console.warn('[BimOS KB] fetchActiveKBContent failed, will use local fallback:', e);
    return null;
  }
}
