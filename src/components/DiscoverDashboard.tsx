import React, { useState, useEffect } from 'react';
import FeaturedStory from './FeaturedStory';
import NewsCard from './NewsCard';
import SidebarWidgets from './SidebarWidgets';
import './DiscoverDashboard.css';

interface NewsItem {
  id: string;
  title: string;
  category: 'Przepisy' | 'Technologia' | 'Rynek';
  imageUrl: string;
  summary: string;
  timestamp: string;
  sourcesCount: number;
}

interface DiscoverDashboardProps {
  onCardClick: (id: string) => void;
}

const DiscoverDashboard: React.FC<DiscoverDashboardProps> = ({ onCardClick }) => {
  const [activeTab, setActiveTab] = useState('Dla Ciebie');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/daily_update.json')
      .then(res => res.json())
      .then(data => {
        if (data && data.news) {
          setNewsList(data.news);
        }
      })
      .catch(err => console.error("Could not fetch news data:", err));
  }, []);

  const featureStory = newsList.length > 0 ? newsList[0] : null;
  const secondaryNews = newsList.length > 1 ? newsList.slice(1, 4) : [];

  return (
    <div className="discover-dashboard">
      <header className="discover-header">
        <h2 className="discover-title">Odkrywaj</h2>
        <nav className="discover-tabs">
          {['Dla Ciebie', 'Najlepszy', 'Tematy'].map(tab => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="discover-content">
        <main className="main-feed">
          {featureStory ? (
            <FeaturedStory 
              {...featureStory}
              onClick={onCardClick}
            />
          ) : (
            <div style={{ padding: 24, textAlign: 'center', background: '#fff', borderRadius: 12 }}>
              Pobieranie wiodącej wiadomości...
            </div>
          )}
          
          <div className="secondary-grid">
            {secondaryNews.map(news => (
               <NewsCard 
                 key={news.id}
                 id={news.id}
                 title={news.title}
                 category={news.category}
                 imageUrl={news.imageUrl}
                 onClick={onCardClick}
               />
             ))}
          </div>
          
          <div className="more-news-item">
            <div className="news-content-full">
              <h2 className="full-title">BimOS testuje funkcję analizy dokumentów jednocześnie dla wielu tomów projektu</h2>
              <div className="full-meta">Opublikowano 14 godzin temu</div>
              <p className="full-summary">Nowy silnik analizy prawnej pozwoli na wykrywanie niespójności między branżami w czasie rzeczywistym, redukując ryzyko błędów wykonawczych...</p>
            </div>
            <div className="full-image-side">
              <img src="https://images.unsplash.com/photo-1503387263359-53c613ef4137?auto=format&fit=crop&q=80&w=800" alt="BimOS AI" />
            </div>
          </div>
        </main>
        
        <aside className="sidebar-container">
          <SidebarWidgets />
        </aside>
      </div>
    </div>
  );
};

export default DiscoverDashboard;
