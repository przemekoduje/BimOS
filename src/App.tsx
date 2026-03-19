import { useState } from 'react'
import SearchHero from './components/SearchHero'
import AdminPanel from './components/AdminPanel'
import InspectionModule from './components/InspectionModule'
import './index.css'

function App() {
  const [view, setView] = useState<'search' | 'admin' | 'inspections'>('search');

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-left">
          <strong onClick={() => setView('search')} style={{ cursor: 'pointer' }}>BimOS</strong>
        </div>
        <div className="nav-right">
          <button className="nav-link" onClick={() => setView('inspections')} style={{color: view === 'inspections' ? '#2563eb' : '', fontWeight: view === 'inspections' ? 600 : 400}}>Przeglądy [AI]</button>
          <button className="nav-link" onClick={() => setView('admin')}>Panel Admina</button>
          <button className="nav-link">Logowanie</button>
        </div>
      </nav>
      
      <main>
        {view === 'search' && <SearchHero />}
        {view === 'admin' && <AdminPanel />}
        {view === 'inspections' && <InspectionModule />}
      </main>

      <style>{`
        .top-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: white;
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
        }
        .nav-link:hover {
          color: var(--text-primary);
        }
      `}</style>
    </div>
  )
}

export default App
