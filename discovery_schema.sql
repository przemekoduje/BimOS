-- 1. Create discovery_feeds table
CREATE TABLE IF NOT EXISTS discovery_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  feed_type TEXT DEFAULT 'rss', -- 'rss', 'scraper'
  category_hint TEXT,
  is_active BOOLEAN DEFAULT true,
  last_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create discovery_articles table
CREATE TABLE IF NOT EXISTS discovery_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feed_id UUID REFERENCES discovery_feeds(id) ON DELETE CASCADE,
  external_id TEXT UNIQUE, -- original link or hash
  title TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'Inne',
  tags TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,
  article_type TEXT DEFAULT 'news', -- 'news', 'market', 'tech'
  ui_template TEXT DEFAULT 'news', -- 'legal', 'news', 'minimal'
  style_config JSONB DEFAULT '{}'::jsonb,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable Realtime for discovery_articles
ALTER PUBLICATION supabase_realtime ADD TABLE discovery_articles;

-- 4. Set up RLS Policies (CRITICAL for data to show up)
ALTER TABLE discovery_feeds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for everyone" ON discovery_feeds FOR SELECT USING (true);
CREATE POLICY "Enable insert/update for anon" ON discovery_feeds FOR ALL USING (true) WITH CHECK (true);

ALTER TABLE discovery_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for everyone" ON discovery_articles FOR SELECT USING (true);
CREATE POLICY "Enable insert/update for anon" ON discovery_articles FOR ALL USING (true) WITH CHECK (true);

-- 5. Working seed data for feeds
INSERT INTO discovery_feeds (name, url, feed_type, category_hint)
VALUES 
('WNP Budownictwo', 'https://www.wnp.pl/rss/budownictwo_22.xml', 'rss', 'Rynek'),
('Property News', 'https://www.propertynews.pl/rss/', 'rss', 'Rynek'),
('Portal Samorządowy', 'https://www.portalsamorzadowy.pl/rss/', 'rss', 'Prawo')
ON CONFLICT (url) DO UPDATE SET 
  name = EXCLUDED.name,
  category_hint = EXCLUDED.category_hint;

-- 6. Helpful index for dynamic categories
CREATE INDEX IF NOT EXISTS idx_discovery_articles_category ON discovery_articles(category);
