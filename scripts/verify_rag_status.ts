import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRagStatus() {
  const { data: docs, error: docsError } = await supabase
    .from('legal_documents')
    .select('name, chunk_count');

  if (docsError) {
    console.error('Error fetching docs:', docsError);
    return;
  }

  console.log('--- RAG DOCUMENT STATUS ---');
  docs.forEach(doc => {
    console.log(`${doc.name}: ${doc.chunk_count} fragments`);
  });
}

checkRagStatus();
