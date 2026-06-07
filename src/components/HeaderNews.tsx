import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeaderNewsProps {
  title: string;
  category: string;
  timestamp: string;
  sourceUrl?: string;
}

export const HeaderNews: React.FC<HeaderNewsProps> = ({ title, category, timestamp, sourceUrl }) => {
  return (
    <div className="header-news-wrapper">
      <div className="header-news-meta">
        <span className="category-badge">{category}</span>
        <span className="timestamp">{timestamp}</span>
      </div>
      <h1 className="header-news-title">{title}</h1>
      <div className="px-publisher-row">
        <div className="domain-icon"></div>
        <span className="publisher-name">Źródło RSS</span>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="read-original-btn">
            Czytaj oryginał <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
};
