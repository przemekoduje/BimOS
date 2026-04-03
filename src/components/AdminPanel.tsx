import React, { useEffect, useState } from 'react';
import { fetchEngineers, type Engineer } from '../services/engineerService';
import { Search, Download, RefreshCw, UserCheck, Activity, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './AdminPanel.css';

interface EnrichmentLog {
  timestamp: string;
  name: string;
  license: string;
  email?: string;
  phone?: string;
}

interface EnrichmentStatus {
  status: 'running' | 'stopped' | 'error';
  lastActive: string;
  message: string;
  totalChecked?: number;
}

interface Profile {
  id: string;
  email: string;
  is_blocked: boolean;
  created_at: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ecrub' | 'users' | 'analytics'>('ecrub');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isProfilesLoading, setIsProfilesLoading] = useState(false);
  
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [filtered, setFiltered] = useState<Engineer[]>([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    province: '',
    speciality: '',
    hasEmail: false,
    hasPhone: false
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  // New state for enrichment monitor modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enrichmentLogs, setEnrichmentLogs] = useState<EnrichmentLog[]>([]);
  const [pendingEnrichments, setPendingEnrichments] = useState<any[]>([]);
  const [scriptStatus, setScriptStatus] = useState<EnrichmentStatus | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/enrichment_logs.json');
      if (res.ok) {
        const data = await res.json();
        setEnrichmentLogs(data);
      }
    } catch (err) {
      console.warn('Wystąpił błąd przy pobieraniu logów, plik może nie istnieć:', err);
    }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch('/enrichment_pending.json');
      if (res.ok) {
        const data = await res.json();
        setPendingEnrichments(data);
      } else {
        setPendingEnrichments([]);
      }
    } catch (err) {
      console.warn('Wystąpił błąd przy pobieraniu poczekalni, plik może nie istnieć:', err);
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/enrichment_status.json');
      if (res.ok) {
        const data = await res.json();
        
        // Pomiń wyświetlanie że działa, jeśli ostatni ping był dawniej niż np. 2 minuty temu (skrypt mógł paść bez pożegnania)
        const lastActiveTime = new Date(data.lastActive).getTime();
        const now = new Date().getTime();
        const twoMinutes = 2 * 60 * 1000;
        
        if (data.status === 'running' && (now - lastActiveTime > twoMinutes)) {
          data.status = 'stopped';
          data.message = 'Nie wykryto aktywności skryptu od dłuższego czasu (zawiesił się lub został zamknięty).';
        }

        setScriptStatus(data);
      }
    } catch (err) {
      setScriptStatus(null);
    }
  };

  const handleToggleScript = async () => {
    try {
      if (scriptStatus?.status === 'running') {
        const res = await fetch('/api/enrichment/stop', { method: 'POST' });
        if (res.ok) {
          setScriptStatus(prev => prev ? { ...prev, status: 'stopped' } : null);
        }
      } else {
        const res = await fetch('/api/enrichment/start', { method: 'POST' });
        if (res.ok) {
          setScriptStatus(prev => prev ? { ...prev, status: 'running' } : { status: 'running', message: 'Uruchamianie...', lastActive: new Date().toISOString(), totalChecked: 0 });
        }
      }
      setTimeout(fetchStatus, 1000);
    } catch (err) {
      console.error('Failed to toggle script', err);
    }
  };

  const fetchProfiles = async () => {
    setIsProfilesLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching profiles:', error);
    } else {
      setProfiles(data || []);
    }
    setIsProfilesLoading(false);
  };

  const toggleBlockStatus = async (profileId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_blocked: !currentStatus })
      .eq('id', profileId);
    
    if (error) {
      console.error('Error toggling block status:', error);
    } else {
      fetchProfiles();
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchProfiles();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchEngineers().then(data => {
      setEngineers(data);
      setFiltered(data);
    });

    // Initial fetch
    fetchStatus();

    // Auto-popup every 1 hour (3600000ms) for modal logs
    const intervalLogs = setInterval(() => {
      setIsModalOpen(true);
      fetchLogs();
      fetchPending();
    }, 3600000);

    // Poll status every 5 seconds to get heartbeat 
    const intervalStatus = setInterval(() => {
      fetchStatus();
      if (isModalOpen) {
         fetchPending();
      }
    }, 5000);

    return () => {
      clearInterval(intervalLogs);
      clearInterval(intervalStatus);
    };
  }, []);

  // Fetch logs manually when modal opens via button
  useEffect(() => {
    if (isModalOpen) {
      fetchLogs();
      fetchPending();
    }
  }, [isModalOpen]);

  const handleApprovePending = async (id: string) => {
    try {
      const res = await fetch('/api/enrichment/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchPending();
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  const handleRejectPending = async (id: string) => {
    try {
      const res = await fetch('/api/enrichment/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchPending();
    } catch (err) {
      console.error('Action failed', err);
    }
  };

  useEffect(() => {
    let result = engineers.filter(e => {
      const nameMatch = (e.name || '').toLowerCase().includes(search.toLowerCase());
      const licenseMatch = (e.licenseNumber || '').toLowerCase().includes(search.toLowerCase());
      return nameMatch || licenseMatch;
    });

    if (filters.province) {
      result = result.filter(e => e.province === filters.province);
    }
    if (filters.speciality) {
      result = result.filter(e => (e.speciality || '').includes(filters.speciality));
    }
    if (filters.hasEmail) {
      result = result.filter(e => !!e.email);
    }
    if (filters.hasPhone) {
      result = result.filter(e => !!e.phone);
    }

    setFiltered(result);
    setCurrentPage(1); // Reset to page 1 on search/filter
  }, [search, filters, engineers]);

  const uniqueProvinces = Array.from(new Set(engineers.map(e => e.province)));
  const uniqueSpecialities = Array.from(new Set(engineers.map(e => e.speciality))).slice(0, 10);

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div className="admin-container" style={{ flexDirection: 'column' }}>
      
      {/* Pasek Nawigacji Wewnętrznej Zakładek */}
      <div style={{ display: 'flex', gap: 16, padding: '20px 24px', borderBottom: '1px solid #eee', background: '#fff' }}>
        <button 
          onClick={() => setActiveTab('ecrub')}
          style={{ padding: '8px 16px', background: activeTab === 'ecrub' ? '#eff6ff' : 'transparent', color: activeTab === 'ecrub' ? '#2563eb' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
        >
          Baza Inżynierów (e-CRUB)
        </button>
        <button 
          onClick={() => setActiveTab('users')}
          style={{ padding: '8px 16px', background: activeTab === 'users' ? '#eff6ff' : 'transparent', color: activeTab === 'users' ? '#2563eb' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
        >
          Zarządzanie Użytkownikami
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          style={{ padding: '8px 16px', background: activeTab === 'analytics' ? '#eff6ff' : 'transparent', color: activeTab === 'analytics' ? '#2563eb' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
        >
          Analityka SEO / Ruch Webowy
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* WIDOK: E-CRUB */}
        {activeTab === 'ecrub' && (
          <>
            <aside className="admin-sidebar">
              <div className="sidebar-header">
                <UserCheck size={20} />
                <span>Filtry e-CRUB</span>
              </div>
              
              <div className="filter-group">
                <label>Województwo</label>
                <select value={filters.province} onChange={e => setFilters({...filters, province: e.target.value})}>
                  <option value="">Wszystkie</option>
                  {uniqueProvinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div className="filter-group">
                <label>Specjalność</label>
                <select value={filters.speciality} onChange={e => setFilters({...filters, speciality: e.target.value})}>
                  <option value="">Wszystkie</option>
                  {uniqueSpecialities.map(s => <option key={s} value={s}>{s.substring(0, 30)}...</option>)}
                </select>
              </div>

              <div className="filter-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={filters.hasEmail} 
                    onChange={e => setFilters({...filters, hasEmail: e.target.checked})} 
                  />
                  <span>Posiada Email</span>
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={filters.hasPhone} 
                    onChange={e => setFilters({...filters, hasPhone: e.target.checked})} 
                  />
                  <span>Posiada Telefon</span>
                </label>
              </div>

              <button className="refresh-btn" onClick={() => window.location.reload()}>
                <RefreshCw size={16} />
                <span>Odśwież bazę</span>
              </button>
            </aside>

            <main className="admin-main">
              <header className="admin-header">
                <div className="search-box">
                  <Search size={18} />
                  <input 
                    placeholder="Szukaj po nazwisku lub numerze uprawnień..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <div className="header-stats">
                  Znaleziono: <strong>{filtered.length}</strong>
                </div>
                <div className="header-actions">
                  <div className="toggle-wrapper">
                    <span className="toggle-label">Wyszukiwanie AI w tle</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={scriptStatus?.status === 'running'}
                        onChange={handleToggleScript}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  
                  <button className="enrich-status-btn" onClick={() => setIsModalOpen(true)}>
                    <div className="status-indicator-container">
                      <Activity size={18} />
                      {scriptStatus?.status === 'running' && <span className="running-indicator pulse-dot"></span>}
                    </div>
                    Status Wzbogacania
                  </button>
                  <button className="export-btn">
                    <Download size={18} />
                    Eksportuj CSV
                  </button>
                </div>
              </header>

              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Imię i Nazwisko</th>
                      <th>Tytuł</th>
                      <th>Nr Uprawnień</th>
                      <th>Miejscowość</th>
                      <th>Kontakt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map(eng => (
                      <tr key={eng.id}>
                        <td className="bold">{eng.name}</td>
                        <td>{eng.title}</td>
                        <td><code className="license">{eng.licenseNumber}</code></td>
                        <td>{eng.city}</td>
                        <td>
                          <div className="contact-info-cell">
                            {eng.email ? (
                              <div className="contact-item">
                                <span className="tag email">Email</span>
                                <span className="contact-value">{eng.email}</span>
                              </div>
                            ) : (
                              <span className="tag missing">Brak maila</span>
                            )}
                            {eng.phone && (
                              <div className="contact-item">
                                <span className="tag phone">Tel</span>
                                <span className="contact-value">{eng.phone}</span>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <footer className="admin-footer">
                <div className="pagination">
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(1)}
                    className="page-btn"
                  >Pierwsza</button>
                  <button 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="page-btn"
                  >Poprzednia</button>
                  <span className="page-info">
                    Strona <strong>{currentPage}</strong> z <strong>{totalPages}</strong>
                  </span>
                  <button 
                    disabled={currentPage === totalPages || totalPages === 0} 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="page-btn"
                  >Następna</button>
                  <button 
                    disabled={currentPage === totalPages || totalPages === 0} 
                    onClick={() => setCurrentPage(totalPages)}
                    className="page-btn"
                  >Ostatnia</button>
                </div>
              </footer>
            </main>
          </>
        )}

        {/* WIDOK: USERS */}
        {activeTab === 'users' && (
          <main className="admin-main" style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: 24, fontSize: '1.5rem', fontWeight: 600 }}>Poczekalnia i Lista Uprawnionych (Whitelist)</h2>
            <div className="table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Data Rejestracji</th>
                    <th>E-mail Użytkownika</th>
                    <th>Firma (Typ)</th>
                    <th>Status</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {isProfilesLoading ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px' }}>Ładowanie użytkowników...</td></tr>
                  ) : profiles.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '24px' }}>Brak zarejestrowanych użytkowników.</td></tr>
                  ) : profiles.map(profile => (
                    <tr key={profile.id}>
                      <td>{new Date(profile.created_at).toLocaleDateString()}</td>
                      <td className="bold">{profile.email}</td>
                      <td>{profile.email === 'przemek.rakotny@gmail.com' ? 'Administrator' : 'Użytkownik (MagicLink)'}</td>
                      <td>
                        <span className={`tag ${profile.is_blocked ? 'missing' : 'email'}`}>
                          {profile.is_blocked ? 'Zablokowany' : 'Aktywny'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleBlockStatus(profile.id, profile.is_blocked)}
                          disabled={profile.email === 'przemek.rakotny@gmail.com'}
                          style={{ 
                            padding: '6px 12px', 
                            background: profile.is_blocked ? '#10b981' : '#ef4444', 
                            color: 'white', 
                            borderRadius: 4, 
                            border: 'none', 
                            cursor: profile.email === 'przemek.rakotny@gmail.com' ? 'not-allowed' : 'pointer',
                            fontSize: '0.85rem',
                            opacity: profile.email === 'przemek.rakotny@gmail.com' ? 0.5 : 1
                          }}
                        >
                          {profile.is_blocked ? 'Odblokuj' : 'Zablokuj'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        )}

        {/* WIDOK: ANALYTICS */}
        {activeTab === 'analytics' && (
          <main className="admin-main" style={{ padding: '32px' }}>
            <h2 style={{ marginBottom: 24, fontSize: '1.5rem', fontWeight: 600 }}>Metryki Webowe i Zaangażowanie (Mock Analytics)</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
              <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 8 }}>Miesięczni Unikalni Testerzy</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>124</div>
                <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: 8 }}>↑ 12% od ostatniego tygodnia</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 8 }}>Wypowiedzi AI (Wysłane Prompty)</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>3,482</div>
                <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: 8 }}>↑ Szacowany koszt $4.12</div>
              </div>
              <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: 8 }}>Użycie Bazy "e-CRUB"</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>89 wyszukań</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 8 }}>Najpopularniejsze: "Kierownik Budowy"</div>
              </div>
            </div>

            <div style={{ background: '#fff', padding: 32, borderRadius: 12, border: '1px dashed #cbd5e1', textAlign: 'center', color: '#94a3b8' }}>
              <Activity size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <h3 style={{ color: '#334155', fontWeight: 500 }}>Aby na żywo renderować interaktywne wykresy GA4</h3>
              <p style={{ maxWidth: 400, margin: '12px auto' }}>Wklej <code>ID Metryki G-XXXXXXX</code> do pliku konfiguracyjnego `index.html` oraz zintegruj <i>@google-analytics/data</i>.</p>
            </div>
          </main>
        )}

      </div>

      {/* MODAL RAPORTU WZBOGACANIA */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div className="admin-modal-title">
                <Activity size={24} className={scriptStatus?.status === 'running' ? "pulse-icon" : "offline-icon"} />
                <h2>Raport z Wzbogacania Bazy w Tle</h2>
              </div>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="admin-modal-body">
              {scriptStatus && (
                <div className={`script-status-banner ${scriptStatus.status}`}>
                  <div className="scprit-status-header">
                    <span className={`status-dot ${scriptStatus.status}`}></span>
                    <strong>{scriptStatus.status === 'running' ? 'Skrypt przeszukujący jest aktywny' : 'Skrypt przeszukujący jest zatrzymany'}</strong>
                  </div>
                  <p className="script-status-message">{scriptStatus.message}</p>
                  <div className="script-status-time">Ostatnia aktywność: {new Date(scriptStatus.lastActive).toLocaleTimeString()}</div>
                </div>
              )}

              <p className="modal-description">
                Poniżej znajdują się oczekujące e-maile odnalezione przez sztuczną inteligencję w Internecie. 
                Możesz je ręcznie <strong>Zatwierdzić</strong> lub <strong>Odrzucić</strong> zanim trafią do głównego zbioru.
              </p>
              
              {pendingEnrichments.length === 0 ? (
                <div className="no-logs">
                  <p>Brak oczekujących maili w poczekalni.</p>
                </div>
              ) : (
                <div className="logs-list">
                  {pendingEnrichments.map((log, i) => (
                    <div className="log-item" key={log.id || i}>
                      <div className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</div>
                      <div className="log-details">
                        <span className="log-name">{log.name}</span>
                        <span className="log-license">({log.license})</span>
                      </div>
                      <div className="log-contact-info">
                        {log.email && <div className="log-email pending-email">E-mail: {log.email}</div>}
                        {log.phone && <div className="log-phone pending-phone" style={{color: '#ff6b6b'}}>Tel: {log.phone}</div>}
                      </div>
                      <div className="log-actions">
                        <button className="approve-btn" onClick={() => handleApprovePending(log.id)}>✓ Zatwierdź</button>
                        <button className="reject-btn" onClick={() => handleRejectPending(log.id)}>✗ Odrzuć</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="admin-modal-footer">
              <button className="primary-btn" onClick={() => {
                setIsModalOpen(false);
                window.location.reload(); // Refresh to see them in the main table
              }}>
                Odśwież widok tabeli
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
