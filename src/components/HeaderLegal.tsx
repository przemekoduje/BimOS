import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface HeaderLegalProps {
  title: string;
  category: string;
  imageUrl?: string;
  metadata?: any;
}

export const HeaderLegal: React.FC<HeaderLegalProps> = ({ title, category, imageUrl, metadata }) => {
  // Przykładowe korzystanie z obiektu metadata
  const validityStatus = metadata?.validity || 'Obowiązujący';

  return (
    <div className="header-legal-wrapper">
      <div 
        className="px-hero-image-container legal-hero"
        style={{ backgroundImage: `url("${imageUrl || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1200'}")` }}
      >
        <div className="legal-hero-overlay">
          <div className="header-legal-meta">
            <span className="category-badge legal">{category}</span>
            <div className={`validity-status ${validityStatus === 'Obowiązujący' ? 'active' : 'warning'}`}>
              {validityStatus === 'Obowiązujący' ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
              <span>Status: {validityStatus}</span>
            </div>
          </div>
          <h1 className="px-article-title legal">{title}</h1>
        </div>
      </div>
    </div>
  );
};
