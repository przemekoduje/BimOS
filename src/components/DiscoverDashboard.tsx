import React, { useState } from 'react';
import DiscoveryCard from './DiscoveryCard';
import SidebarWidgets from './SidebarWidgets';
import { useDiscoveryFeed } from '../hooks/useDiscoveryFeed';
import { RefreshCw } from 'lucide-react';
import './DiscoverDashboard.css';

interface DiscoverDashboardProps {
  onCardClick: (id: string) => void;
}

const CATEGORIES = ['Dla Ciebie', 'Najlepszy', 'Tematy'];

// Wewnętrzny komponent Skeleton
const DiscoverySkeleton = () => (
  <div className="discovery-card-px skeleton">
    <div className="card-image-px skeleton-img"></div>
    <div className="card-content-px">
      <div className="skeleton-line category"></div>
      <div className="skeleton-line title"></div>
      <div className="skeleton-line title short"></div>
      <div className="skeleton-line text"></div>
      <div className="skeleton-line text"></div>
    </div>
  </div>
);

// MOCK DATA: Static mockups matching the Google News-style view
// MOCK DATA: Static mockups matching the Google News-style view
export const MOCK_ARTICLES = [
  {
    id: 'm1',
    title: 'Trump mówi, że przedłużenie rozejmu z Iranem jest „wysoce...',
    summary: 'Wiceprezydent Vance udaje się do Pakistanu na wtorkowe negocjacje, jednak Iran odmówił wysłania delegacji, a rozejm wygasa w środę.',
    image_url: 'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=900',
    category: 'Polityka',
    article_type: 'news' as const,
    published_at: new Date(Date.now() - 3600000).toISOString() // 1h temu
  },
  {
    id: 'm2',
    title: 'ZEA ostrzega, że może rozliczać handel ropą w juanach bez wsparcia...',
    summary: 'Zmiana geopolityczna na rynku ropy naftowej nabiera rozpędu.',
    image_url: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=600',
    category: 'Gospodarka',
    article_type: 'market' as const,
    published_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'm3',
    title: 'Starmer przyznaje, że wprowadził Parlament w błąd w sprawie skandalu...',
    summary: 'Kontrowersje wokół oświadczeń brytyjskiego premiera w Londynie.',
    image_url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&q=80&w=600',
    category: 'Polityka',
    article_type: 'news' as const,
    published_at: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: 'm4',
    title: 'Ceny DRAM i SSD ponad dwukrotnie wzrosły w I kwartale 2026 roku...',
    summary: 'Rynek podzespołów komputerowych notuje historyczne wzrosty cen.',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    category: 'Technologia',
    article_type: 'tech' as const,
    published_at: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 'm5',
    title: 'Szef NATO Rutte nazywa spekulacje o wycofaniu się USA „absurdem”',
    summary: 'Rutte powiedział niemieckiej gazecie, że sojusz musi jednak zwiększać wydatki zbrojeniowe i samodzielność obronną.',
    image_url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=900',
    category: 'Polityka',
    article_type: 'news' as const,
    published_at: new Date(Date.now() - 18000000).toISOString()
  },
  {
    id: 'm6',
    title: 'Europejski rynek nieruchomości odbija po latach stagnacji, rosną inwestycje',
    summary: 'Raport Q1 2026 wskazuje na znaczny wzrost zainteresowania przestrzenią biurową w stolicach CEE.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    category: 'Rynek',
    article_type: 'market' as const,
    published_at: new Date(Date.now() - 21600000).toISOString()
  },
  {
    id: 'm7',
    title: 'Certyfikacja BIM staje się obowiązkowa w zamówieniach publicznych od maja',
    summary: 'Nowa ustawa budowlana wprowadza rygorystyczne zasady korzystania z cyfrowych modeli 3D.',
    image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=600',
    category: 'Prawo',
    article_type: 'news' as const,
    published_at: new Date(Date.now() - 25200000).toISOString()
  },
  {
    id: 'm8',
    title: 'AI przejmuje kontrolę nad harmonogramami dużych placów budowy',
    summary: 'Coraz więcej deweloperów polega na uczeniu maszynowym w celu minimalizacji opóźnień logistycznych.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    category: 'Technologia',
    article_type: 'tech' as const,
    published_at: new Date(Date.now() - 28800000).toISOString()
  },
  {
    id: 'm9',
    title: 'Zielona transformacja w betonie komórkowym — nowe unijne dotacje',
    summary: 'Producenci z sektora budowlanego mogą liczyć na miliardy euro z funduszu ekologicznego ze wzyględu na nowe normatywy.',
    image_url: 'https://images.unsplash.com/photo-1541888086925-0c13bb106883?auto=format&fit=crop&q=80&w=900',
    category: 'Środowisko',
    article_type: 'news' as const,
    published_at: new Date(Date.now() - 32400000).toISOString()
  }
];

const DiscoverDashboard: React.FC<DiscoverDashboardProps> = ({ onCardClick }) => {
  // Temporary switch to mock data
  const articles = MOCK_ARTICLES;
  const isLoading = false;
  const categories: string[] = [];
  const [activeTab, setActiveTab] = useState('Dla Ciebie');

  // Używamy dynamicznych kategorii, ale dodajemy stałe zakładki
  const displayTabs = Array.from(new Set([...CATEGORIES, ...categories]));

  // Filtrowanie z zabezpieczeniem na brak kategorii
  const filteredArticles = activeTab === 'Dla Ciebie' 
    ? articles 
    : articles.filter(a => a.category === activeTab);

  // Funkcja mapująca dynamicznie wpisy w konkretny układ szpaltowy
  const renderMixedFeed = (items: any[]) => {
    const chunks = [];
    let i = 0;
    let isImageRight = true;

    while (i < items.length) {
      if (i % 4 === 0) {
        // Główny lub kolejny duży artykuł (co 4)
        const article = items[i];
        chunks.push(
          <div key={`split-${article.id}`} className={`featured-split ${isImageRight ? 'image-right' : 'image-left'}`} onClick={() => onCardClick(article.id)}>
            <div className="featured-split-content">
              <div className="featured-category">{article.category}</div>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <div className="featured-meta">
                <span>Opublikowano {new Date(article.published_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="featured-split-image" style={{ backgroundImage: `url("${article.image_url}")` }}></div>
          </div>
        );
        isImageRight = !isImageRight; // zamienia układ co kolejny duży artykuł
        i += 1;
      } else {
        // Siatka mniejszych kart
        const gridItems = items.slice(i, i + 3);
        chunks.push(
          <div key={`grid-${i}`} className="discovery-masonry-grid strict-3">
            {gridItems.map(article => (
              <DiscoveryCard 
                key={article.id}
                article={article}
                onClick={onCardClick}
              />
            ))}
          </div>
        );
        i += 3;
      }
    }
    return chunks;
  };

  return (
    <div className="discover-dashboard autonomous">
      <header className="discover-header">
        <div className="title-row">
           <h2 className="discover-title">Odkrywaj</h2>
           <div className="live-pill">
             <div className="live-dot local"></div>
             <span>MOCK DATA</span>
           </div>
        </div>
        <nav className="discover-tabs dynamic">
          {displayTabs.map(tab => (
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
        <main className="main-feed-masonry">
          {isLoading && filteredArticles.length === 0 ? (
            // Skeleton State - Pierwsze ładowanie
            <>
              <div className="featured-discovery-wrapper skeleton-hero">
                 <div className="skeleton-hero-img"></div>
              </div>
              <div className="discovery-masonry-grid auto-fill">
                 {[1, 2, 3, 4, 5, 6].map(i => <DiscoverySkeleton key={i} />)}
              </div>
            </>
          ) : (
            // Załadowane State
            <>
              {renderMixedFeed(filteredArticles)}
              
              {!isLoading && filteredArticles.length === 0 && (
                <div className="empty-state-px">
                  <RefreshCw size={48} className="empty-icon" />
                  <h3>Czekamy na nowe wieści z kanałów RSS...</h3>
                  <p>Twój silnik AI lub funkcja Cron wkrótce pobierze najnowsze aktualności z dodanych źródeł.</p>
                </div>
              )}
            </>
          )}
        </main>
        
        <aside className="sidebar-container">
          <SidebarWidgets />
        </aside>
      </div>
    </div>
  );
};

export default DiscoverDashboard;
