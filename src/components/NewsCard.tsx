import React from 'react';
import { Layers } from 'lucide-react';
import './NewsCard.css';

interface NewsCardProps {
  id: string;
  title: string;
  category: string;
  images?: string[];
  onClick: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, category, images, onClick }) => {
  return (
    <div className="news-card" onClick={() => onClick(id)}>
      <div className="news-card-content">
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-type">{category}</p>
      </div>
      <div className="news-card-visual">
         {images && images.length > 0 ? (
           <div className="stacked-images-container">
             {images.slice().reverse().map((img, idx) => (
                <div 
                  key={idx}
                  className={`stacked-image-layer layer-${idx}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
             ))}
           </div>
         ) : (
           <div className="news-card-icon-bg">
             <Layers size={24} color="#666" />
           </div>
         )}
      </div>
    </div>
  );
};

export default NewsCard;
