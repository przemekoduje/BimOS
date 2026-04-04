import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function searchArt38() {
  console.log('Searching for Art 38 in legal_chunks...');
  const { data, error } = await supabase
    .from('legal_chunks')
    .select('content, article_ref, document_name')
    .like('content', '%Art. 38%')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('--- FOUND CHUNKS ---');
  data.forEach(c => {
    console.log(`[${c.document_name} | ${c.article_ref}]`);
    console.log(c.content.substring(0, 500));
    console.log('---');
  });
}

searchArt38();
