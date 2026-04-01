import React from 'react';
import { Sun, TrendingUp, TrendingDown, Building2, Cpu, BarChart3 } from 'lucide-react';
import './SidebarWidgets.css';

const SidebarWidgets: React.FC = () => {
  return (
    <div className="sidebar-widgets">
      {/* Weather Widget */}
      <div className="widget-card weather-widget">
        <div className="weather-top">
          <div className="weather-temp">4° <span className="unit">F/°C</span></div>
          <div className="weather-status">Słonecznie</div>
        </div>
        <div className="weather-loc">Gliwice <span className="forecast">H: 11° L: 4°</span></div>
        <div className="weather-days">
          {[11, 11, 12, 14, 17].map((t, i) => (
            <div key={i} className="day-forecast">
              <Sun size={14} />
              <span>{t}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* Market Perspectives */}
      <div className="widget-card market-widget">
        <h4 className="widget-title">Perspektywy rynkowe</h4>
        <div className="market-grid">
          <div className="market-item">
            <div className="market-name">Stal (HRC) <span className="up"><TrendingUp size={12} /> 0,63%</span></div>
            <div className="market-val">3840 PLN <span className="diff">+24.00</span></div>
            <div className="sparkline positive"></div>
          </div>
          <div className="market-item">
            <div className="market-name">Drewno C24 <span className="up"><TrendingUp size={12} /> 0,95%</span></div>
            <div className="market-val">1250 PLN <span className="diff">+12.00</span></div>
            <div className="sparkline positive"></div>
          </div>
          <div className="market-item">
            <div className="market-name">Cement <span className="up"><TrendingUp size={12} /> 2,00%</span></div>
            <div className="market-val">680 PLN <span className="diff">+13.00</span></div>
            <div className="sparkline positive"></div>
          </div>
          <div className="market-item">
            <div className="market-name">Izolacje <span className="down"><TrendingDown size={12} /> 20,68%</span></div>
            <div className="market-val">42 PLN <span className="diff">-6.33</span></div>
            <div className="sparkline negative"></div>
          </div>
        </div>
      </div>

      {/* Trending Companies */}
      <div className="widget-card companies-widget">
        <h4 className="widget-title">Trendujące firmy (AEC Tech)</h4>
        <div className="company-list">
          {[
            { name: 'Autodesk', ticker: 'ADSK', val: '245.40 USD', change: '+5.59%', icon: <Building2 size={16} /> },
            { name: 'Bentley Systems', ticker: 'BSY', val: '52.51 USD', change: '+5.49%', icon: <BarChart3 size={16} /> },
            { name: 'Trimble Inc.', ticker: 'TRMB', val: '62.05 USD', change: '+12.80%', icon: <Cpu size={16} /> },
            { name: 'Nemetschek', ticker: 'NEM', val: '88.99 EUR', change: '+8.31%', icon: <Building2 size={16} /> },
            { name: 'Budimex SA', ticker: 'BDX', val: '645.00 PLN', change: '+13.37%', icon: <BarChart3 size={16} /> }
          ].map((c, i) => (
            <div key={i} className="company-item">
              <div className="comp-left">
                <div className="comp-icon">{c.icon}</div>
                <div className="comp-info">
                  <div className="comp-name">{c.name}</div>
                  <div className="comp-ticker">{c.ticker}</div>
                </div>
              </div>
              <div className="comp-right">
                <div className="comp-val">{c.val}</div>
                <div className="comp-change">{c.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarWidgets;
