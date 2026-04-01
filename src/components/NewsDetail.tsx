import React, { useEffect, useState } from 'react';
import { ChevronLeft, Share2, Bookmark, MessageSquare, Loader2 } from 'lucide-react';
import './NewsDetail.css';

interface Source {
  id: string;
  title: string;
  domain: string;
  url: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: string;
  shortNote?: string;
  content?: string;
  isNew?: boolean;
  date?: string;
}

interface NewsDetailProps {
  id: string;
  onBack: () => void;
}

const MOCK_SOURCES: Source[] = [
  { id: 's1', title: 'Ustawa o zmianie ustawy Prawo budowlane', domain: 'isap.sejm.gov.pl', url: '#' },
  { id: 's2', title: 'Komunikat GUNB w sprawie cyfryzacji', domain: 'gunb.gov.pl', url: '#' },
  { id: 's3', title: 'Analiza skutków regulacji - RCL', domain: 'rcl.gov.pl', url: '#' }
];

const NewsDetail: React.FC<NewsDetailProps> = ({ id, onBack }) => {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch('/automated_news.json');
        const data: NewsItem[] = await response.json();
        const found = data.find(n => n.id === id);
        
        // Symulacja ładowania "pełnego wpisu blogowego"
        setTimeout(() => {
          setItem(found || null);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Błąd ładowania szczegółów:", error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="news-detail-loading">
        <Loader2 size={32} className="loading-spinner" />
        <p>Generuję pełną analizę przepisu...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="news-detail-error">
        <h2>Nie znaleziono wpisu</h2>
        <button onClick={onBack}>Wróć do listy</button>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <nav className="news-detail-nav">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={20} />
          <span>Powrót</span>
        </button>
        <div className="nav-actions">
          <button className="icon-btn"><Share2 size={18} /></button>
          <button className="icon-btn"><Bookmark size={18} /></button>
        </div>
      </nav>

      <div className="news-detail-content">
        <header className="detail-header">
          <div className="category-tag">{item.category}</div>
          <h1 className="detail-title">{item.title}</h1>
          <div className="detail-meta">Opublikowano {item.date || 'dzisiaj'} • Przez BimOS AI • Moduł Legislacyjny</div>
        </header>

        <section className="sources-section">
          <h4 className="section-label">Źródła analizy</h4>
          <div className="sources-grid">
            {MOCK_SOURCES.map(source => (
              <a key={source.id} href={source.url} className="source-card" target="_blank" rel="noopener noreferrer">
                <div className="source-info">
                  <span className="source-domain">{source.domain}</span>
                  <span className="source-title">{source.title}</span>
                </div>
                <div className="source-index">{source.id.replace('s', '')}</div>
              </a>
            ))}
          </div>
        </section>

        <article className="detail-body">
          <p className="lead-text">
            {item.shortNote}
          </p>
          
          <div className="divider"></div>

          <div dangerouslySetInnerHTML={{ __html: item.content?.replace(/\n/g, '<br/>') || '' }} />

          <blockquote>
            "Automatyczna analiza legislacyjna BimOS pozwala na natychmiastowe wdrożenie zmian projektowych bez konieczności ręcznego śledzenia Dziennika Ustaw." 
            <cite>— System AI BimOS</cite>
          </blockquote>
        </article>

        <section className="related-section">
          <h4 className="section-label">Powiązane zapytania do AI</h4>
          <div className="related-pills">
            <button className="pill-btn"><MessageSquare size={14} /> Czy ta zmiana wpływa na moje obecne projekty?</button>
            <button className="pill-btn"><MessageSquare size={14} /> Wygeneruj listę kontrolną dla nowej normy</button>
            <button className="pill-btn"><MessageSquare size={14} /> Porównaj z poprzednią wersją ustawy</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NewsDetail;
