import React from 'react';
import './NewsCard.css';

interface NewsCardProps {
  id: string;
  title: string;
  category: 'Przepisy' | 'Technologia' | 'Rynek';
  imageUrl?: string;
  onClick: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, category, imageUrl, onClick }) => {
  return (
    <div className="news-card" onClick={() => onClick(id)}>
      <div className="news-card-image" style={{ backgroundImage: `url(${imageUrl || 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800'})` }}>
        <div className="news-card-badge">{category}</div>
      </div>
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-type">Aplikacja</p>
      </div>
    </div>
  );
};

export default NewsCard;
