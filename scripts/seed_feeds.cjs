const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("🌱 Seeding working RSS feeds...");
  const { data, error } = await supabase.from('discovery_feeds').upsert([
    { name: 'WNP Budownictwo', url: 'https://www.wnp.pl/rss/budownictwo_22.xml', feed_type: 'rss', category_hint: 'Rynek' },
    { name: 'Property News', url: 'https://www.propertynews.pl/rss/', feed_type: 'rss', category_hint: 'Rynek' },
    { name: 'Portal Samorządowy', url: 'https://www.portalsamorzadowy.pl/rss/', feed_type: 'rss', category_hint: 'Prawo' }
  ], { onConflict: 'url' });

  if (error) console.error("❌ Seed failed:", error);
  else console.log("✅ Seed completed successfully!");
}

seed();
