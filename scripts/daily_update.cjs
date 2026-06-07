const fs = require('fs');
const path = require('path');
const axios = require('axios');
const RSSParser = require('rss-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const parser = new RSSParser({ 
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// Supabase Init
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // or service_role if available
const supabase = createClient(supabaseUrl, supabaseKey);

const GEMINI_API_KEY = process.env.GOOGLE_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.VITE_GOOGLE_API_KEY;

async function runDiscoveryEngine() {
  console.log("🚀 Starting Autonomous Discovery Engine...");

  // 1. Fetch Active feeds
  const { data: feeds, error: feedError } = await supabase
    .from('discovery_feeds')
    .select('*')
    .eq('is_active', true);

  if (feedError) {
    console.error("❌ Error fetching feeds:", feedError);
    return;
  }

  console.log(`📡 Found ${feeds.length} active feeds.`);

  for (const feed of feeds) {
    try {
      console.log(`\n--- Processing: ${feed.name} ---`);
      const rssData = await parser.parseURL(feed.url);
      
      // Process top 3 newest items per feed to avoid token overflow
      const items = rssData.items.slice(0, 5); // Process up to 5 latest items to keep it lean

      for (const item of items) {
        // 1. Check if article already processed via AI (Single-Run Optimization)
        const { data: existing, error: checkError } = await supabase
          .from('discovery_articles')
          .select('id')
          .eq('external_id', item.link)
          .maybeSingle();

        if (checkError) {
          console.error(`- Error checking existence for ${item.link}:`, checkError);
          continue;
        }

        if (existing) {
          console.log(`- Skipping (already analyzed & in DB): ${item.title}`);
          continue;
        }

        console.log(`- Analyzing new article: ${item.title}`);
        
        // AI Enrichment
        let enriched = await enrichWithAI(item, feed.category_hint);
        
        if (!enriched) {
          console.log(`⚠️ AI skipped/failed for ${item.title}, using raw RSS data as fallback.`);
          enriched = {
            title: item.title,
            summary: item.contentSnippet || item.content || 'Brak opisu z kanału RSS.',
            category: feed.category_hint || 'Ogólne',
            tags: [],
            articleType: 'news',
            imageUrl: 'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=600',
            visualPrompt: ''
          };
        }

        // Upsert to Supabase
        const { error: upsertError } = await supabase
          .from('discovery_articles')
          .upsert({
            feed_id: feed.id,
            external_id: item.link,
            title: enriched.title || item.title,
            summary: enriched.summary,
            content: item.content || item.contentSnippet || '',
            url: item.link,
            image_url: enriched.imageUrl,
            category: enriched.category,
            tags: enriched.tags,
            article_type: enriched.articleType || 'news',
            ui_template: enriched.uiTemplate || (enriched.category === 'Prawo' ? 'legal' : 'news'),
            metadata: {
              original_author: item.creator || item.author,
              source_name: feed.name,
              visual_prompt: enriched.visualPrompt
            },
            published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString()
          }, { onConflict: 'external_id' });

        if (upsertError) {
          console.error(`❌ Failed to upsert article: ${item.title}`, upsertError);
        } else {
          console.log(`✅ Synced: ${item.title} -> [${enriched.category}]`);
        }
      }

      // Update feed last_fetched_at
      await supabase
        .from('discovery_feeds')
        .update({ last_fetched_at: new Date().toISOString() })
        .eq('id', feed.id);

    } catch (e) {
      console.error(`⚠️ Failed to process feed ${feed.name}:`, e.message);
    }
  }
}

async function enrichWithAI(rssItem, categoryHint) {
  if (!GEMINI_API_KEY) return null;

  try {
    // TOKEN PRUNING: Usuwamy nadmiarowy szum (skrypty, stopki, dziwne formatowanie)
    // Ograniczamy długość do pierwszych 2000 znaków (esencja dla modelu), reszta odcięta by oszczędzać tokeny.
    let prunedContent = rssItem.contentSnippet || rssItem.title;
    if (prunedContent.length > 2000) {
      prunedContent = prunedContent.substring(0, 2000) + '...';
    }

    const prompt = `
Enrich this construction/AEC news item for a discovery engine.
TITLE: ${rssItem.title}
CONTENT: ${prunedContent}
CATEGORY HINT: ${categoryHint || 'General'}

CRITICAL TASK: In the "summary", if you use any highly technical terminology, wrap the term and its short definition using this exact syntax: [[Term::Definition of term]]. 
Example: "Wdrożono zaawansowany [[BIM::Building Information Modeling - cyfrowy zapis danych budowli]] dla nowego projektu."

Return JSON exactly:
{
  "title": "Improved, technical title in Polish",
  "summary": "Technical summary in Polish (2-3 sentences). Include interactive [[Term::Definition]] tags if applicable.",
  "category": "One specific Polish category (eg. Prawo, Technologia, Rynek, Materiały)",
  "tags": ["tag1", "tag2"],
  "articleType": "news|tech|market",
  "uiTemplate": "legal|news|minimal",
  "imageUrl": "High quality Unsplash architectural URL"
}
Output raw JSON only.
`;
    const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    let raw = res.data.candidates[0].content.parts[0].text;
    raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(raw);
  } catch (err) {
    console.error("🤖 AI Enrichment failed:", err.message);
    return null;
  }
}

runDiscoveryEngine();
