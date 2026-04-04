import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgprbdqrkpkrbciimkoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncHJiZHFya3BrcmJjaWlta29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkyNjQsImV4cCI6MjA5MDc3NTI2NH0.-pjMzsCwaBxcTPmIwm9ZJbfw_7sAL0C6SAnYvKEFi18';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('Checking legal_chunks columns...');
  const { data, error } = await supabase
    .from('legal_chunks')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('--- COLUMNS ---');
  console.log(Object.keys(data[0] || {}));
}

checkSchema();
