import React from 'react';
import { Share2, Clock, Zap, BarChart2, BookOpen } from 'lucide-react';
import './NewsCard.css';

interface DiscoveryCardProps {
  article: {
    id: string;
    title: string;
    summary: string;
    image_url: string;
    category: string;
    article_type: 'news' | 'tech' | 'market';
    published_at: string;
  };
  onClick: (id: string) => void;
}

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ article, onClick }) => {
  const type = article.article_type || 'news';
  
  const getTypeIcon = () => {
    switch (type) {
      case 'tech': return <Zap size={14} />;
      case 'market': return <BarChart2 size={14} />;
      default: return <BookOpen size={14} />;
    }
  };

  const displayDate = article.published_at || (article as any).created_at || new Date().toISOString();

  return (
    <div className={`discovery-card-px type-${type}`} onClick={() => onClick(article.id)}>
      <div className="card-image-px">
        <img 
          src={article.image_url || 'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=600'} 
          alt={article.title} 
          loading="lazy" 
        />
        <div className="card-type-tag">
          {getTypeIcon()}
          <span>{type.toUpperCase()}</span>
        </div>
      </div>
      <div className="card-content-px">
        <div className="card-category-px">{article.category || 'Ogólne'}</div>
        <h3 className="card-title-px">{article.title}</h3>
        <p className="card-summary-px">{article.summary || 'Trwa generowanie streszczenia przez AI...'}</p>
        <div className="card-footer-px">
          <div className="footer-left-px">
            <Clock size={12} />
            <span>{new Date(displayDate).toLocaleDateString()}</span>
          </div>
          <div className="footer-right-px">
            <Share2 size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryCard;
