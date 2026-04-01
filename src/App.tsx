import { useState } from 'react'
import { Layers, Search, Compass, ClipboardCheck, Settings, LogIn, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import SearchHero from './components/SearchHero'
import AdminPanel from './components/AdminPanel'
import InspectionModule from './components/InspectionModule'
import DiscoverDashboard from './components/DiscoverDashboard'
import NewsDetail from './components/NewsDetail'
import AuthModal from './components/AuthModal'
import './index.css'

function App() {
  const [view, setView] = useState<'search' | 'admin' | 'inspections' | 'discover'>('search');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const handleNewsClick = (id: string) => {
    setSelectedNewsId(id);
  };

  const handleBackToDiscover = () => {
    setSelectedNewsId(null);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo" onClick={() => { setView('search'); setSelectedNewsId(null); }}>
            <Layers size={28} strokeWidth={1.5} className="sidebar-icon-main" />
            <span className="sidebar-text title-text">BimOS</span>
          </div>

          <nav className="sidebar-nav">
            <button 
              className="sidebar-link"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              style={{ marginBottom: '12px' }}
            >
              {isSidebarExpanded ? <PanelLeftClose size={22} strokeWidth={1.5} className="sidebar-icon" /> : <PanelLeftOpen size={22} strokeWidth={1.5} className="sidebar-icon" />}
              <span className="sidebar-text" style={{ fontWeight: 600 }}>{isSidebarExpanded ? 'Zwiń' : 'Rozwiń'}</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'search' ? 'active' : ''}`}
              onClick={() => { setView('search'); setSelectedNewsId(null); }}
            >
              <Search size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Szukaj</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'discover' ? 'active' : ''}`}
              onClick={() => { setView('discover'); setSelectedNewsId(null); }}
            >
              <Compass size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Odkrywaj</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'inspections' ? 'active' : ''}`}
              onClick={() => setView('inspections')}
            >
              <ClipboardCheck size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Przeglądy [AI]</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button 
            className={`sidebar-link ${view === 'admin' ? 'active' : ''}`}
            onClick={() => setView('admin')}
          >
            <Settings size={22} strokeWidth={1.5} className="sidebar-icon" />
            <span className="sidebar-text">Panel Admina</span>
          </button>
          <button 
            className="sidebar-link"
            onClick={() => setShowAuthModal(true)}
          >
            <LogIn size={22} strokeWidth={1.5} className="sidebar-icon" />
            <span className="sidebar-text">Logowanie</span>
          </button>
        </div>
      </aside>
      
      <main className="main-content">
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

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}

      <style>{`
        .app {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: var(--bg-primary);
        }

        .sidebar {
          width: 72px;
          height: 100vh;
          background: #f9f9f9;
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .sidebar.expanded {
          width: 250px;
          box-shadow: 4px 0 24px rgba(0,0,0,0.04);
        }

        .sidebar-top, .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          padding: 0 22px;
          margin-bottom: 32px;
          cursor: pointer;
          color: #1a1a1a;
          min-width: 250px;
        }
        
        .sidebar-icon-main {
          flex-shrink: 0;
          margin-left: 2px;
        }

        .title-text {
          font-weight: 600 !important;
          font-size: 1.25rem !important;
          margin-left: 14px !important;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          min-width: 250px;
          transition: background 0.2s, color 0.2s;
          text-align: left;
        }

        .sidebar-link:hover {
          background: rgba(0,0,0,0.04);
          color: #1a1a1a;
        }

        .sidebar-link.active {
          color: #2563eb;
          font-weight: 600;
        }

        .sidebar-link.active .sidebar-icon {
          color: #2563eb;
        }

        .sidebar-text {
          margin-left: 16px;
          font-size: 0.95rem;
          white-space: nowrap;
          opacity: 0;
          font-weight: 500;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar.expanded .sidebar-text {
          opacity: 1;
        }

        .sidebar-icon {
          flex-shrink: 0;
        }

        .main-content {
          flex: 1;
          height: 100vh;
          overflow-y: auto;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default App
