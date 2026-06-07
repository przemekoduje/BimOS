import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function test() {
  console.log('Testing Discovery Articles...');
  const { data: articles, error: err1 } = await supabase.from('discovery_articles').select('*').limit(1);
  if (err1) console.error('Error discovery_articles:', err1);
  else console.log('Successfully fetched articles:', articles.length);

  console.log('\nTesting Knowledge Bases...');
  const { data: kbs, error: err2 } = await supabase.from('knowledge_bases').select('*').limit(1);
  if (err2) console.error('Error knowledge_bases:', err2);
  else console.log('Successfully fetched KBs:', kbs.length);
}

test();
