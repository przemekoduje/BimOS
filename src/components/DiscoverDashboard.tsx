import React, { useState } from 'react';
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

const FEATURE_STORY: NewsItem = {
  id: 'f1',
  title: 'Nowe regulacje drastycznie obniżają koszty certyfikacji niskoemisyjnej w 2024',
  summary: 'Najnowsze wytyczne Ministerstwa Rozwoju z 31 marca znacząco zredukowały wymogi proceduralne dla małych i średnich inwestycji, co zwiększa presję na szybkie wdrażanie rozwiązań energooszczędnych i pasywnych w budownictwie wielorodzinnym.',
  timestamp: '3 godziny temu',
  sourcesCount: 14,
  category: 'Przepisy',
  imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
};

const SECONDARY_NEWS: NewsItem[] = [
  {
    id: 's1',
    title: 'Autonomiczny dźwig z AI na warszawskiej budowie zawalił się dzień po premierze',
    summary: '',
    timestamp: '1 dzień temu',
    sourcesCount: 42,
    category: 'Technologia',
    imageUrl: 'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's2',
    title: 'Zależność UE od technologii budowlanych spoza kontynentu – nowe raporty',
    summary: '',
    timestamp: '2 dni temu',
    sourcesCount: 30,
    category: 'Rynek',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 's3',
    title: 'Polska wykrywa luki w bezpieczeństwie systemów BIM dopiero po audycie',
    summary: '',
    timestamp: '3 dni temu',
    sourcesCount: 15,
    category: 'Technologia',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800'
  }
];

interface DiscoverDashboardProps {
  onCardClick: (id: string) => void;
}

const DiscoverDashboard: React.FC<DiscoverDashboardProps> = ({ onCardClick }) => {
  const [activeTab, setActiveTab] = useState('Dla Ciebie');

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
          <FeaturedStory 
            {...FEATURE_STORY}
            onClick={onCardClick}
          />
          
          <div className="secondary-grid">
            {SECONDARY_NEWS.map(news => (
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
