import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgprbdqrkpkrbciimkoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncHJiZHFya3BrcmJjaWlta29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkyNjQsImV4cCI6MjA5MDc3NTI2NH0.-pjMzsCwaBxcTPmIwm9ZJbfw_7sAL0C6SAnYvKEFi18';

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
    console.log(c.content);
    console.log('---');
  });
}

searchArt38();
