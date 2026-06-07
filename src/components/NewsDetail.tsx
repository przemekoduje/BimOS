import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Share2, Bookmark, MessageSquare, Loader2, Globe, Plus, Mic, Send, Database } from 'lucide-react';
import './NewsDetail.css';
import { HeaderNews } from './HeaderNews';
import { HeaderLegal } from './HeaderLegal';
import { InteractiveText } from './InteractiveText';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  timestamp: string;
  ui_template?: 'legal' | 'news' | 'minimal';
  style_config?: any;
  metadata?: any;
  content?: string;
  sourceUrl?: string;
}

interface NewsDetailProps {
  id: string;
  onBack: () => void;
}

import { MOCK_ARTICLES } from './DiscoverDashboard';

const NewsDetail: React.FC<NewsDetailProps> = ({ id, onBack }) => {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [fullContextLoading, setFullContextLoading] = useState(false);
  const [fullContextLoaded, setFullContextLoaded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      // Mock Data z panelu Odkrywaj
      let found: any = MOCK_ARTICLES.find(n => n.id === id);
      
      if (found) {
         if (!found.ui_template) {
           found.ui_template = found.category === 'Prawo' || found.category === 'Legislacja' ? 'legal' : 'news';
         }
         if (!found.metadata) {
           found.metadata = { validity: 'Obowiązujący' };
         }
         // Adapt API keys
         found.imageUrl = found.image_url;
      }
      
      setTimeout(() => {
        setItem(found || null);
        setLoading(false);
      }, 400);
    } catch (error) {
      console.error("Error loading news details:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [query]);

  // Symulacja Just-In-Time Context Retrieval (Pgvector fetch via Supabase)
  const handleLoadFullContext = () => {
    setFullContextLoading(true);
    setTimeout(() => {
      setItem(prev => prev ? { 
        ...prev, 
        content: `Pełna treść dokumentu została pobrana z wektorowej bazy danych. Ta treść była początkowo ukryta (Token Pruned), a została pobrana w mechanizmie Just-in-Time Context Retrieval. Oto przykładowa definicja: [[Just-In-Time::Metodologia ładowania danych na żądanie w celu oszczędności tokenów kontekstowych w modelach typu LLM.]] Została wstrzyknięta by udowodnić działanie parsowania.`
      } : prev);
      setFullContextLoading(false);
      setFullContextLoaded(true);
    }, 1200);
  };

  const getVibeThemeColors = (category: string) => {
    switch(category?.toLowerCase()) {
      case 'prawo':
      case 'legislacja':
        return { '--theme-accent': '#1e3a8a', '--theme-accent-light': '#dbeafe' } as React.CSSProperties; // Navy Blue
      case 'technologia':
        return { '--theme-accent': '#059669', '--theme-accent-light': '#d1fae5' } as React.CSSProperties; // Emerald
      case 'rynek':
      case 'rss':
      default:
        return { '--theme-accent': '#d97706', '--theme-accent-light': '#fef3c7' } as React.CSSProperties; // Amber
    }
  };

  if (loading) {
    return (
      <div className="news-detail-loading">
        <Loader2 size={32} className="loading-spinner" />
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className={`perplexity-view ${item.ui_template || 'news'}`} style={getVibeThemeColors(item.category)}>
      <header className="px-detail-nav">
        <button className="px-back-btn" onClick={onBack}>
          <ChevronLeft size={18} />
          <span>Powrót do Odkrywaj</span>
        </button>
      </header>

      <main className="px-detail-container">
        
        {/* POLIMORFICZNY HEADER */}
        {item.ui_template === 'legal' ? (
          <HeaderLegal 
            title={item.title} 
            category={item.category} 
            imageUrl={item.imageUrl} 
            metadata={item.metadata} 
          />
        ) : (
          <HeaderNews 
            title={item.title} 
            category={item.category} 
            timestamp={item.timestamp || '4 godziny temu'} 
            sourceUrl={item.sourceUrl} 
          />
        )}
        
        {/* EXECUTIVE SUMMARY (Warstwa AI) */}
        <div className="px-executive-summary">
          <div className="summary-label">Podsumowanie AI</div>
          <p className="px-article-lead">
            <InteractiveText content={item.summary} />
          </p>
        </div>

        {/* PEŁNY TEKST / KONTEKST ARTYKUŁU */}
        <div className="full-context-content">
           <InteractiveText content={item.content || 'Tu znajduje się pełna treść pobrana z oryginalnego kanału RSS, dokumentu prawnego lub z bazy wektorowej db, gdy system działa z prawdziwym backendem. Obecnie widzisz dane demonstracyjne (Mock). Poniżej użyliśmy przykładowego tagu definiującego: [[BIM::Building Information Modeling - technologia bazująca na obiektach 3D i parametrach]] aby pokazać jak AI w locie tłumaczy pojęcia.'} />
        </div>

        <div className="px-bottom-spacer"></div>
      </main>
    </div>
  );
};

export default NewsDetail;
