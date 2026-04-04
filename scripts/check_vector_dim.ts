import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgprbdqrkpkrbciimkoh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZncHJiZHFya3BrcmJjaWlta29oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxOTkyNjQsImV4cCI6MjA5MDc3NTI2NH0.-pjMzsCwaBxcTPmIwm9ZJbfw_7sAL0C6SAnYvKEFi18';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkVectorDim() {
  console.log('Checking vector dimension from information_schema...');
  const { data, error } = await supabase.rpc('get_vector_dimension', { table_name: 'legal_chunks', column_name: 'embedding' });
  
  // Alternative: query information_schema if RPC not present
  if (error) {
    const { data: schemaData, error: schemaError } = await supabase
      .from('legal_chunks')
      .select('embedding')
      .limit(1);
    
    // We can't easily get the dimension from select if it's empty.
    // Let's try raw SQL via RPC if possible, or just look at the error message again.
    console.log('RPC failed, trying raw query to check table structure...');
  }

  // Best way: try to INSERT a dummy 768 vector and a 3072 vector and see which one fails.
  const vec768 = new Array(768).fill(0);
  const vec3072 = new Array(3072).fill(0);

  console.log('Trying to insert 768-dim vector...');
  const { error: err768 } = await supabase.from('legal_chunks').insert({
    document_id: '00000000-0000-0000-0000-000000000000',
    content: 'test',
    embedding: vec768
  });
  console.log('768 insert result:', err768?.message || 'SUCCESS');

  console.log('Trying to insert 3072-dim vector...');
  const { error: err3072 } = await supabase.from('legal_chunks').insert({
    document_id: '00000000-0000-0000-0000-000000000000',
    content: 'test',
    embedding: vec3072
  });
  console.log('3072 insert result:', err3072?.message || 'SUCCESS');
}

checkVectorDim();
