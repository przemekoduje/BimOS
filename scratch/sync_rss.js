import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function syncRss() {
  console.log('Cleaning up RSS channels...');
  
  // 1. Delete all channels that are not GUNB
  const { error: delError } = await supabase
    .from('rss_channels')
    .delete()
    .not('url', 'ilike', '%gunb.gov.pl%');

  if (delError) console.error('Delete error:', delError);
  else console.log('Cleaned up unknown channels.');

  // 2. Ensure GUNB exists
  const { data: gunb } = await supabase
    .from('rss_channels')
    .select('*')
    .ilike('url', '%gunb.gov.pl%')
    .single();

  if (!gunb) {
    console.log('GUNB channel missing, adding it...');
    await supabase.from('rss_channels').insert({
      name: 'Główny Urząd Nadzoru Budowlanego',
      url: 'https://www.gunb.gov.pl/rss',
      active: true
    });
  } else {
    console.log('GUNB channel already exists.');
  }
}

syncRss();
