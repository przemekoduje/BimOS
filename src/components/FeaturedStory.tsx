import React from 'react';
import { Heart, MoreHorizontal, MessageSquare } from 'lucide-react';
import './FeaturedStory.css';

interface FeaturedStoryProps {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  sourcesCount: number;
  imageUrl: string;
  onClick: (id: string) => void;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ 
  id, title, summary, timestamp, sourcesCount, imageUrl, onClick 
}) => {
  return (
    <div className="featured-story" onClick={() => onClick(id)}>
      <div className="featured-main">
        <header className="featured-header">
          <h1 className="featured-title">{title}</h1>
          <div className="featured-meta">
            <span className="timestamp">Opublikowano {timestamp}</span>
          </div>
        </header>
        
        <p className="featured-summary">{summary}</p>
        
        <footer className="featured-footer">
          <div className="footer-left">
            <div className="source-avatars">
              <div className="avatar">A</div>
              <div className="avatar">B</div>
              <div className="avatar">C</div>
            </div>
            <span className="source-count">{sourcesCount} źródeł</span>
          </div>
          <div className="footer-right">
            <button className="feat-action-btn"><Heart size={18} /></button>
            <button className="feat-action-btn"><MessageSquare size={18} /></button>
            <button className="feat-action-btn"><MoreHorizontal size={18} /></button>
          </div>
        </footer>
      </div>
      
      <div className="featured-image-container">
        <img src={imageUrl} alt={title} className="featured-image" />
      </div>
    </div>
  );
};

export default FeaturedStory;
