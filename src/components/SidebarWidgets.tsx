import React, { useEffect, useState } from 'react';
import { CloudRain, Wind, AlertTriangle, Building2, Cpu, BarChart3, Sun, Cloud, Snowflake, Loader2 } from 'lucide-react';
import './DiscoverDashboard.css';

interface MarketData {
  commodities: Array<{ name: string; val: string; ticker: string; change: string; trend: string }>;
  techStocks: Array<{ name: string; val: string; ticker: string; change: string; trend: string }>;
}

const SidebarWidgets: React.FC = () => {
  const [weather, setWeather] = useState<{ temp: number; wind: number; code: number; isFallback: boolean } | null>(null);
  const [market, setMarket] = useState<MarketData | null>(null);

  useEffect(() => {
    // 1. Fetch Market Data i Newsów
    fetch('/daily_update.json')
      .then(res => res.json())
      .then(data => {
        if (data.marketData) setMarket(data.marketData);
      })
      .catch(err => console.error("Could not fetch market data:", err));

    // 2. Fetch Weather (Geo -> OpenMeteo)
    const fetchWeather = async (lat: number, lon: number, isFallback: boolean) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        setWeather({
          temp: data.current_weather.temperature,
          wind: data.current_weather.windspeed,
          code: data.current_weather.weathercode,
          isFallback
        });
      } catch (e) {
        console.error("Meteo err", e);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude, false),
        () => fetchWeather(52.2297, 21.0122, true) // fallback WWA
      );
    } else {
      fetchWeather(52.2297, 21.0122, true);
    }
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code <= 3) return <Sun size={24} color="#f59e0b" />;
    if (code <= 69) return <CloudRain size={24} color="#3b82f6" />;
    if (code <= 79) return <Snowflake size={24} color="#60a5fa" />;
    return <Cloud size={24} color="#64748b" />;
  };

  const getStockIcon = (name: string) => {
    if (name.includes('Auto')) return <Building2 size={16} />;
    if (name.includes('Bentley')) return <BarChart3 size={16} />;
    if (name.includes('Trimble')) return <Cpu size={16} />;
    return <Building2 size={16} />;
  };

  return (
    <div className="sidebar-widgets">
      
      {/* Weather Widget */}
      <div className="widget-card weather-widget">
        <h4 className="widget-title">Warunki Budowlane (Live) <span style={{fontSize: '0.7rem', color: '#64748b', fontWeight: 'normal', float: 'right', marginTop: 4}}>{weather?.isFallback ? "Warszawa (Dom.)" : "Lokalne"}</span></h4>
        {weather ? (
          <div className="weather-content">
            <div className="weather-main">
              {getWeatherIcon(weather.code)}
              <div className="temp">{Math.round(weather.temp)}°C</div>
            </div>
            <div className="weather-details">
              <div className="weather-detail-item">
                <Wind size={14} />
                <span>Wiatr: {weather.wind} km/h</span>
              </div>
              {weather.wind > 40 && (
                <div className="weather-alert">
                  <AlertTriangle size={14} />
                  <span>Wstrzymać prace dźwigowe</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, color: '#64748b' }}>
            <Loader2 className="spinning-loader" size={16} /> <span>Pobieranie pogody...</span>
          </div>
        )}
      </div>

      {/* Market Commodities */}
      <div className="widget-card market-widget">
        <h4 className="widget-title">Ceny Surowców (Global)</h4>
        <div className="market-list">
          {market ? market.commodities.map((item, idx) => (
            <div key={idx} className="market-item">
              <div className="market-name">{item.name} <span className={item.trend === 'positive' ? 'up' : 'down'}>{item.change}</span></div>
              <div className="market-val">{item.val} <span className="diff">{item.ticker}</span></div>
              <div className={`sparkline ${item.trend}`}></div>
            </div>
          )) : (
            <div style={{ padding: 12, color: '#64748b' }}>Pobieranie stawek...</div>
          )}
        </div>
      </div>

      {/* Trending Companies */}
      <div className="widget-card companies-widget">
        <h4 className="widget-title">Giełda AEC Tech</h4>
        <div className="company-list">
          {market ? market.techStocks.map((c, i) => (
            <div key={i} className="company-item">
              <div className="comp-left">
                <div className="comp-icon">{getStockIcon(c.name)}</div>
                <div className="comp-info">
                  <div className="comp-name">{c.name}</div>
                  <div className="comp-ticker">{c.ticker}</div>
                </div>
              </div>
              <div className="comp-right">
                <div className="comp-val">{c.val}</div>
                <div className={`comp-change ${c.trend === 'negative' ? 'down' : ''}`}>{c.change}</div>
              </div>
            </div>
          )) : (
            <div style={{ padding: 12, color: '#64748b' }}>Pobieranie kursów...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets;
