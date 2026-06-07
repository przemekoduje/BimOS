import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface DiscoveryArticle {
  id: string;
  title: string;
  summary: string;
  image_url: string;
  category: string;
  tags: string[];
  article_type: 'news' | 'tech' | 'market';
  published_at: string;
  created_at: string;
}

export const useDiscoveryFeed = () => {
  const [articles, setArticles] = useState<DiscoveryArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  const fetchInitial = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('discovery_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      const safeData = (data || []).filter(a => a && typeof a === 'object');
      setArticles(safeData);
      
      // Derive unique categories dynamically from the data
      const uniqueCats = Array.from(new Set(safeData.map(a => a.category).filter(Boolean)));
      setCategories(['Dla Ciebie', 'Najlepszy', 'Tematy', ...uniqueCats.filter(c => !['Dla Ciebie', 'Najlepszy', 'Tematy'].includes(c as string))]);
      
    } catch (err) {
      console.error("[BimOS] Discovery feed fetch error:", err);
      setArticles([]);
      setCategories(['Dla Ciebie', 'Najlepszy', 'Tematy']);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitial();

    // Subscribe to Realtime with absolute safety against concurrent mount collisions
    const channelId = `discovery_realtime_${Math.random().toString(36).substring(2, 9)}`;
    const channel = supabase
      .channel(channelId)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'discovery_articles' }, 
        (payload) => {
          if (payload.new && (payload.new as any).id) {
            console.log('Realtime push received:', payload.new);
            setArticles(prev => [payload.new as DiscoveryArticle, ...prev]);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          console.warn('[BimOS] Realtime subscription failed. Feed will be static.');
        } else if (status === 'SUBSCRIBED') {
          console.log(`[BimOS] Realtime discovery active on ${channelId}`);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { articles, isLoading, categories };
};
