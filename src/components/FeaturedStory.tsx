import React from 'react';
import { Heart, MoreHorizontal, MessageSquare, Share2 } from 'lucide-react';
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
    <div className="featured-story-px" onClick={() => onClick(id)}>
      <div className="f-content">
        <h1 className="f-title">{title}</h1>
        <div className="f-meta">
           <Share2 size={14} className="f-icon-blue" />
           <span className="f-time">Opublikowano {timestamp}</span>
        </div>
        <p className="f-summary">{summary}</p>
        
        <div className="f-footer">
          <div className="f-sources">
            <div className="avatar-stack">
              <div className="av-mini b-blue">B</div>
              <div className="av-mini b-teal">E</div>
              <div className="av-mini b-navy">I</div>
            </div>
            <span className="f-count">{sourcesCount} źródeł</span>
          </div>
          <div className="f-actions">
            <button className="f-act-btn"><Heart size={18} /></button>
            <button className="f-act-btn"><MoreHorizontal size={18} /></button>
          </div>
        </div>
      </div>
      
      <div className="f-image">
        <img src={imageUrl} alt={title} />
      </div>
    </div>
  );
};

export default FeaturedStory;
