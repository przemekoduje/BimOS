import { useState, useEffect } from 'react'
import { Layers, Search, Compass, Settings, LogIn, LogOut, PanelLeftClose, PanelLeftOpen, MessageSquare } from 'lucide-react'
import { supabase } from './lib/supabase'
import SearchHero from './components/SearchHero'
import AdminPanel from './components/AdminPanel'
import DiscoverDashboard from './components/DiscoverDashboard'
import NewsDetail from './components/NewsDetail'
import AuthModal from './components/AuthModal'
import './index.css'

function App() {
  const [view, setView] = useState<'search' | 'admin' | 'discover'>('search');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_EMAIL = 'przemek.rakotny@gmail.com';

  useEffect(() => {
    // Sprawdź aktualną sesję przy starcie
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email || '');
      }
      setIsLoading(false);
    });

    // Nasłuchuj zmian stanu autoryzacji
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = session.user.email || '';
        setIsLoggedIn(true);
        setUserEmail(email);
        
        // Jeśli to admin i właśnie się zalogował (prymitywne sprawdzenie zdarzenia SIGNED_IN)
        if (email === ADMIN_EMAIL && _event === 'SIGNED_IN') {
          setView('admin');
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail('');
        setView('search');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('search');
  };

  const handleLoginSuccess = (email: string) => {
    setShowAuthModal(false);
    if (email === ADMIN_EMAIL) {
      setView('admin');
    } else {
      setView('search');
    }
  };

  const handleNewsClick = (id: string) => {
    setSelectedNewsId(id);
  };

  const handleBackToDiscover = () => {
    setSelectedNewsId(null);
  };

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' }}>
        <div className="spinning-loader"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo" onClick={() => { setView('search'); }}>
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
              <span className="sidebar-text">Szukaj (cKOB)</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'discover' ? 'active' : ''}`}
              onClick={() => { setView('discover'); setSelectedNewsId(null); }}
            >
              <Compass size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Odkrywaj</span>
            </button>
          </nav>

          {isLoggedIn && isSidebarExpanded && (
            <div className="sidebar-history fade-in">
              <div className="sidebar-history-title">Ostatnie rozmowy</div>
              <div className="sidebar-history-list">
                {[
                  'Wymagania dla przeglądu rocznego', 
                  'Założenie konta dla inwestora', 
                  'Uprawnienia budowlane w cKOB', 
                  'Dodanie wpisu o kontroli kominiarskiej', 
                  'Zgłoszenie katastrofy budowlanej', 
                  'Błędy przy dodawaniu załącznika', 
                  'Oświadczenie kierownika budowy',
                  'Kalkulacja kubatury z pozwolenia'
                ].map((item, idx) => (
                  <button key={idx} className="sidebar-history-item" onClick={() => { setView('search'); setSelectedNewsId(null); }}>
                    <MessageSquare size={16} className="sidebar-history-icon" />
                    <span className="sidebar-history-text">{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-bottom">
          {userEmail === 'przemek.rakotny@gmail.com' && (
            <button 
              className={`sidebar-link ${view === 'admin' ? 'active' : ''}`}
              onClick={() => setView('admin')}
            >
              <Settings size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Panel Admina</span>
            </button>
          )}
          
          {isLoggedIn ? (
            <button className="sidebar-link" onClick={handleLogout}>
              <LogOut size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Wyloguj się</span>
            </button>
          ) : (
            <button className="sidebar-link" onClick={() => setShowAuthModal(true)}>
              <LogIn size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Logowanie</span>
            </button>
          )}
        </div>
      </aside>
      
      <main className="main-content">
        {!isLoggedIn ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
            <Layers size={64} style={{ marginBottom: 24, opacity: 0.2 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 12 }}>Witaj w BimOS</h2>
            <p style={{ maxWidth: 400, textAlign: 'center', lineHeight: 1.6 }}>Zaloguj się, aby uzyskać dostęp do bazy wiedzy cKOB oraz platformy inżynierskiej.</p>
            <button 
              onClick={() => setShowAuthModal(true)}
              style={{ marginTop: 24, padding: '12px 24px', background: '#2563eb', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Zaloguj się teraz
            </button>
          </div>
        ) : (
          <>
            {view === 'search' && <SearchHero />}
            {view === 'admin' && <AdminPanel />}
            {view === 'discover' && (
              selectedNewsId ? (
                <NewsDetail id={selectedNewsId} onBack={handleBackToDiscover} />
              ) : (
                <DiscoverDashboard onCardClick={handleNewsClick} />
              )
            )}
          </>
        )}
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={handleLoginSuccess} />}

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

        .sidebar-top {
          flex: 1;
          min-height: 0;
        }

        .sidebar-history {
          margin-top: 24px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .sidebar-history-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #999;
          font-weight: 600;
          margin-bottom: 12px;
          padding-left: 8px;
          letter-spacing: 0.5px;
        }

        .sidebar-history-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
          flex: 1;
          padding-right: 4px;
        }

        .sidebar-history-list::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-history-list::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 4px;
        }

        .sidebar-history-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background: none;
          border: none;
          color: #555;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          text-align: left;
        }

        .sidebar-history-item:hover {
          background: rgba(0,0,0,0.04);
          color: #1a1a1a;
        }

        .sidebar-history-icon {
          margin-right: 12px;
          flex-shrink: 0;
          color: #888;
        }

        .sidebar-history-text {
          font-size: 0.85rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @keyframes fadeInHistory {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeInHistory 0.3s ease-out forwards;
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
