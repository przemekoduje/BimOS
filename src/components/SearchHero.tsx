import React, { useState } from 'react';
import { Search, Send, Clock, Globe } from 'lucide-react';
import './SearchHero.css';

const SearchHero: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Construction AI Assistant</h1>
        <p className="hero-subtitle">Baza wiedzy i nadzór cyfrowy w Twoim zasięgu.</p>
        
        <div className="search-wrapper">
          <div className="search-bar">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Zadaj pytanie techniczne lub wyszukaj inżyniera..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="send-button">
              <Send size={18} />
            </button>
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
          <button className="pill">Wyszukaj inżyniera</button>
          <button className="pill">Prawo budowlane 2024</button>
          <button className="pill">Analiza wąskich gardeł</button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
