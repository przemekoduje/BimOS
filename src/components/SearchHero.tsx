import React, { useState } from 'react';
import { Send, Clock, Globe, Plus, Mic } from 'lucide-react';
import NewsGrid from './NewsGrid';
import QuickNewsList from './QuickNewsList';
import NewsDetail from './NewsDetail';
import './SearchHero.css';

const SearchHero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  if (selectedNewsId) {
    return <NewsDetail id={selectedNewsId} onBack={() => setSelectedNewsId(null)} />;
  }

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Inżynieria bez biurka.</h1>
        <p className="hero-subtitle">Odpowiedź jest tam, gdzie Ty.</p>
        
        <div className="search-wrapper">
          <div className="search-bar">
            <button className="search-action-btn">
              <Plus size={20} />
            </button>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Zadaj pytanie techniczne lub wyszukaj inżyniera..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="search-right-actions">
              <button className="search-action-btn">
                <Mic size={20} />
              </button>
              <button className="send-button">
                <Send size={18} />
              </button>
            </div>
          </div>
          
          <div className="search-footer">
            <div className="footer-item">
              <Globe size={14} />
              <span>Aktualizacja: GUNB, Sejm (RCL)</span>
            </div>
            <div className="footer-item">
              <Clock size={14} />
              <span>Dane e-CRUB: 2024</span>
            </div>
          </div>
        </div>

        <div className="quick-links">
          <button className="pill active">Przypadki użycia</button>
          <button className="pill">Stwórz prototyp</button>
          <button className="pill">Pozyskiwanie leadów</button>
          <button className="pill">Pomóż mi</button>
        </div>

        <QuickNewsList onItemClick={(text) => setQuery(text)} />

        <section className="dashboard-news-section">
          <NewsGrid onCardClick={(id) => setSelectedNewsId(id)} />
        </section>
      </div>
    </div>
  );
};

export default SearchHero;
