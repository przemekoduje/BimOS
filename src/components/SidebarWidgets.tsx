import React, { useEffect, useState } from 'react';
import { CloudRain, Wind, Sun, Cloud, Snowflake, Loader2, ArrowUpRight, ArrowDownRight, Droplets } from 'lucide-react';
import './DiscoverDashboard.css';

const SidebarWidgets: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; code: number; hourly: any[] } | null>(null);

  useEffect(() => {
    // Simulated Weather with hourly data
    setWeather({
      temp: 8,
      code: 1,
      hourly: [
        { time: '11:00', temp: 11, code: 1 },
        { time: '12:00', temp: 12, code: 3 },
        { time: '14:00', temp: 14, code: 1 },
        { time: '15:00', temp: 15, code: 1 },
        { time: '18:00', temp: 13, code: 3 },
      ]
    });
  }, []);

  const getWeatherIcon = (code: number, size = 20) => {
    if (code <= 1) return <Sun size={size} color="#f59e0b" />;
    if (code <= 3) return <Cloud size={size} color="#94a3b8" />;
    return <CloudRain size={size} color="#3b82f6" />;
  };

  return (
    <div className="perplex-sidebar">
      {/* Weather Widget */}
      <div className="px-widget weather-px">
        <div className="wx-top">
          <div className="wx-main">
            <span className="wx-temp">{weather?.temp}°</span>
            <span className="wx-unit">F / C</span>
          </div>
          <div className="wx-desc">Lekki deszcz</div>
        </div>
        <div className="wx-loc">Gliwice <span className="wx-hi-lo">H: 11° L: 5°</span></div>
        <div className="wx-hourly">
          {weather?.hourly.map((h, i) => (
            <div key={i} className="hx-item">
              <span className="hx-time">{h.time.split(':')[0]}°</span>
              {getWeatherIcon(h.code, 16)}
            </div>
          ))}
        </div>
      </div>

      {/* Market Perspectives */}
      <div className="px-widget market-px">
        <div className="px-header">
          <span>Perspektywy rynkowe</span>
          <ArrowUpRight size={14} />
        </div>
        <div className="market-grid">
          {[
            { name: 'S&P 500', val: '7103,36', change: '-0,32%', trend: 'down', color: '#ef4444' },
            { name: 'NASDAQ', val: '24 362,78', change: '-0,43%', trend: 'down', color: '#ef4444' },
            { name: 'VIX', val: '19,10', change: '+ 9,27%', trend: 'up', color: '#22c55e' },
            { name: 'Bitcoin', val: '75 806,42 USD', change: '+ 0,98%', trend: 'up', color: '#22c55e' },
          ].map((m, i) => (
            <div key={i} className="m-card">
              <div className="m-name">{m.name}</div>
              <div className={`m-change ${m.trend}`}>{m.change}</div>
              <div className="m-val">{m.val}</div>
              <div className="m-chart">
                 <svg width="100%" height="20" viewBox="0 0 100 20">
                    <path 
                      d={m.trend === 'up' ? "M0 15 Q 25 5, 50 12 T 100 5" : "M0 5 Q 25 15, 50 8 T 100 15"} 
                      fill="none" 
                      stroke={m.color} 
                      strokeWidth="1.5" 
                    />
                 </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Companies */}
      <div className="px-widget companies-px">
        <div className="px-header">
           <span>Trendujące firmy</span>
           <ArrowUpRight size={14} />
        </div>
        <div className="co-list">
          {[
            { name: 'Tesla, Inc.', ticker: 'TSLA', val: '392,13 USD', change: '-2,12%', color: '#E31937' },
            { name: 'Apple Inc.', ticker: 'AAPL', val: '272,51 USD', change: '+0,88%', color: '#000000' },
            { name: 'Alphabet Inc.', ticker: 'GOOG', val: '337,06 USD', change: '-0,69%', color: '#4285F4' },
          ].map((co, i) => (
            <div key={i} className="co-item">
               <div className="co-icon" style={{ backgroundColor: co.color }}>{co.name[0]}</div>
               <div className="co-info">
                  <div className="co-name">{co.name}</div>
                  <div className="co-ticker">{co.ticker}</div>
               </div>
               <div className="co-nums">
                  <div className="co-val">{co.val.split(' ')[0]}</div>
                  <div className={`co-change ${co.change.startsWith('+') ? 'up' : 'down'}`}>{co.change}</div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets;
