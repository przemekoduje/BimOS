import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgprbdqrkpkrbciimkoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncHJiZHFya3BrcmJjaWlta29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkyNjQsImV4cCI6MjA5MDc3NTI2NH0.-pjMzsCwaBxcTPmIwm9ZJbfw_7sAL0C6SAnYvKEFi18';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDocs() {
  console.log('Checking legal_documents...');
  const { data, error } = await supabase
    .from('legal_documents')
    .select('name, chunk_count');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('--- DOCUMENTS ---');
  console.log(data);
}

checkDocs();
