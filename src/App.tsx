import { useState } from 'react'
import SearchHero from './components/SearchHero'
import AdminPanel from './components/AdminPanel'
import InspectionModule from './components/InspectionModule'
import DiscoverDashboard from './components/DiscoverDashboard'
import NewsDetail from './components/NewsDetail'
import './index.css'

function App() {
  const [view, setView] = useState<'search' | 'admin' | 'inspections' | 'discover'>('search');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const handleNewsClick = (id: string) => {
    setSelectedNewsId(id);
  };

  const handleBackToDiscover = () => {
    setSelectedNewsId(null);
  };

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-left">
          <strong onClick={() => { setView('search'); setSelectedNewsId(null); }} style={{ cursor: 'pointer' }}>BimOS</strong>
        </div>
        <div className="nav-right">
          <button 
            className="nav-link" 
            onClick={() => { setView('discover'); setSelectedNewsId(null); }}
            style={{ color: view === 'discover' ? '#2563eb' : '', fontWeight: view === 'discover' ? 600 : 400 }}
          >
            Odkrywaj
          </button>
          <button className="nav-link" onClick={() => setView('inspections')} style={{color: view === 'inspections' ? '#2563eb' : '', fontWeight: view === 'inspections' ? 600 : 400}}>Przeglądy [AI]</button>
          <button className="nav-link" onClick={() => setView('admin')}>Panel Admina</button>
          <button className="nav-link">Logowanie</button>
        </div>
      </nav>
      
      <main>
        {view === 'search' && <SearchHero />}
        {view === 'admin' && <AdminPanel />}
        {view === 'inspections' && <InspectionModule />}
        {view === 'discover' && (
          selectedNewsId ? (
            <NewsDetail id={selectedNewsId} onBack={handleBackToDiscover} />
          ) : (
            <DiscoverDashboard onCardClick={handleNewsClick} />
          )
        )}
      </main>

      <style>{`
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .nav-right {
          display: flex;
          gap: 1.5rem;
        }
        .nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}

export default App
