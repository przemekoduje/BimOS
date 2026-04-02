import React from 'react';
import NewsCard from './NewsCard';
import './NewsGrid.css';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  images: string[];
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Analiza przepisów i WT',
    category: 'Interpretacja warunków technicznych i obostrzeń ppoż.',
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'
    ]
  },
  {
    id: '2',
    title: 'Procedury w elektronicznym KOB',
    category: 'Przewodnik dodawania wpisów, przeglądów i załączników.',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=200'
    ]
  },
  {
    id: '3',
    title: 'Znajdź inżyniera budownictwa',
    category: 'Wyciąg z rejestru inżynierów i weryfikacja uprawnień.',
    images: [
      'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=200'
    ]
  },
  {
    id: '4',
    title: 'Cyfrowy obieg dokumentów',
    category: 'Moduł e-CRUB i procedury administracyjno-budowlane.',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200'
    ]
  }
];

interface NewsGridProps {
  onCardClick: (id: string) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ onCardClick }) => {
  return (
    <div className="news-grid-container">
      <div className="news-grid-header">
        <h3 className="news-grid-title">Wypróbuj możliwości</h3>
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
