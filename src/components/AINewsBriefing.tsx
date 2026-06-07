import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import FeaturedStory from './FeaturedStory';
import './AINewsBriefing.css';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  summary: string;
  timestamp: string;
  sourcesCount: number;
}

interface BriefingData {
  lastUpdate: string;
  news: NewsItem[];
  chatBriefing: string;
}

interface AINewsBriefingProps {
  onCardClick: (id: string, text: string) => void;
}

const AINewsBriefing: React.FC<AINewsBriefingProps> = ({ onCardClick }) => {
  const [data, setData] = useState<BriefingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/daily_update.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load AI briefing:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="briefing-skeleton">Inicjowanie analizy AI...</div>;
  if (!data || !data.news.length) return null;

  const mainStory = data.news[0];

  return (
    <section className="ai-news-briefing">
      <div className="briefing-header">
        <div className="header-label">
          <Sparkles size={16} className="sparkle-icon" />
          <span>BimOS AI Intelligence Hub</span>
        </div>
        <div className="update-tag">
          Aktualizacja: {new Date(data.lastUpdate).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="briefing-layout">
        <div className="featured-wrapper">
          <FeaturedStory 
            {...mainStory}
            onClick={() => onCardClick(mainStory.id, mainStory.title)}
          />
        </div>

        <div className="insights-panel">
          <div className="insights-card">
            <h3 className="insights-title">Briefing Dnia</h3>
            <p className="insights-text">{data.chatBriefing}</p>
            <div className="insights-footer">
              <span className="insights-tag">#PrawoBudowlane</span>
              <span className="insights-tag">#BIM</span>
              <button className="insights-action">
                <span>Szczegóły</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
          
          <div className="secondary-insight">
             <div className="insight-icon-box">
                <ExternalLink size={16} />
             </div>
             <div className="insight-content">
                <h4>Status Bazy Wiedzy</h4>
                <p>System zindeksował 4 nowe dokumenty techniczne w ciągu ostatnich 24h.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AINewsBriefing;
