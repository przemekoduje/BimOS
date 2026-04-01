import React, { useEffect, useState } from 'react';
import { Scale, ChevronRight } from 'lucide-react';
import './QuickNewsList.css';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  shortNote?: string;
  content?: string;
  isNew?: boolean;
}

interface QuickNewsListProps {
  onItemClick: (text: string) => void;
}

const QuickNewsList: React.FC<QuickNewsListProps> = ({ onItemClick }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/automated_news.json');
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error("Błąd ładowania legislacji:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (news.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [news.length]);

  if (loading || news.length === 0) return null;

  const currentItem = news[currentIndex];

  return (
    <div className="legislative-ticker-container">
      <div 
        className="ticker-line" 
        onClick={() => onItemClick(currentItem.title)}
      >
        <div className="ticker-label">
          <Scale size={14} />
          <span>Legislacja:</span>
        </div>
        <div className="ticker-content" key={currentIndex}>
          <span className="ticker-text">{currentItem.title}</span>
          {currentItem.isNew && <span className="ticker-badge">NOWE</span>}
        </div>
        <div className="ticker-action">
          <span>Zapytaj AI</span>
          <ChevronRight size={14} />
        </div>
      </div>
      
      {news.length > 1 && (
        <div className="ticker-controls">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) => (prev + 1) % news.length);
            }}
            className="next-ticker-btn"
            title="Następna zmiana"
          >
            Następna →
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickNewsList;
