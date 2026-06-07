import React from 'react';
import { Heart, MoreHorizontal } from 'lucide-react';
import './NewsCard.css';

interface NewsCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  onClick: (id: string) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, category, imageUrl, onClick }) => {
  return (
    <div className="news-card-px" onClick={() => onClick(id)}>
      <div className="card-image-px">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-content-px">
        <h3 className="card-title-px">{title}</h3>
        <div className="card-footer-px">
          <div className="footer-left-px">
            <div className="avatar-mini-row">
               <div className="av-sm b-teal">B</div>
               <div className="av-sm b-navy">I</div>
            </div>
            <span className="source-link-px">30 źródeł</span>
          </div>
          <div className="footer-right-px">
            <button className="card-act-btn"><Heart size={16} /></button>
            <button className="card-act-btn"><MoreHorizontal size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
