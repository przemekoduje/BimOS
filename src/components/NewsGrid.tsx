import React from 'react';
import NewsCard from './NewsCard';
import { LayoutGrid, Shuffle } from 'lucide-react';
import './NewsGrid.css';

interface NewsItem {
  id: string;
  title: string;
  category: 'Przepisy' | 'Technologia' | 'Rynek';
  imageUrl: string;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Nowelizacja Prawa Budowlanego 2024: Co się zmienia w pozwoleniach?',
    category: 'Przepisy',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Drukarka 3D na placu budowy – czy to już standard w Polsce?',
    category: 'Technologia',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'BIM w projektach infrastrukturalnych – nowe wytyczne ministerstwa.',
    category: 'Technologia',
    imageUrl: 'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Zmiany w WT2021: Nowe wymogi izolacyjności dla przegród.',
    category: 'Przepisy',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  }
];

interface NewsGridProps {
  onCardClick: (id: string) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ onCardClick }) => {
  return (
    <div className="news-grid-container">
      <div className="news-grid-header">
        <button className="news-filter-btn active">
          <LayoutGrid size={16} />
          <span>Wyświetl wszystkie</span>
        </button>
        <button className="news-filter-btn">
          <Shuffle size={16} />
          <span>Losowo</span>
        </button>
      </div>
      
      <div className="news-grid">
        {MOCK_NEWS.map(item => (
          <NewsCard 
            key={item.id}
            {...item}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;
