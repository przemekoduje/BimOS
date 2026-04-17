import React, { useEffect, useState, useRef } from 'react';
import { fetchEngineers, type Engineer } from '../services/engineerService';
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Download, 
  ToggleLeft, 
  ToggleRight, 
  Search, 
  BookOpen, 
  History, 
  Activity, 
  X, 
  Database, 
  FileText, 
  ChevronRight, 
  Scale,
  RefreshCw,
  UserCheck,
  Upload,
  DollarSign,
  Cpu,
  Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { fetchKnowledgeBases, uploadKnowledgeBase, getDownloadUrl, toggleKnowledgeBaseActive, deleteKnowledgeBase, type KnowledgeBase } from '../services/knowledgeService';
import { 
  uploadLegalDocument, 
  fetchLegalDocuments, 
  toggleLegalDocActive, 
  deleteLegalDocument, 
  reindexLegalDocument, 
  LEGAL_CATEGORIES, 
  type LegalDocument, 
  type LegalCategory, 
  type IngestionProgress 
} from '../services/legalRagService';
import { 
  subscribeToAiMonitoring, 
  stopAllAiActiveProcesses, 
  enableAiActiveProcesses,
  resetAiMonitoringStats,
  type AIMonitoringStats 
} from '../services/aiService';
import './AdminPanel.css';

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
  const [activeTab, setActiveTab] = useState<'ecrub' | 'users' | 'analytics' | 'knowledge' | 'ai_monitor'>('ecrub');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isProfilesLoading, setIsProfilesLoading] = useState(false);

  // Knowledge Base State
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([]);
  const [kbLoading, setKbLoading] = useState(false);
  const [kbUploadStatus, setKbUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [kbUploadMessage, setKbUploadMessage] = useState('');
  const [kbForm, setKbForm] = useState({ name: '', version: '1.0', description: '' });
  const kbFileRef = useRef<HTMLInputElement>(null);

  // Legal Documents (RAG) State
  const [legalDocs, setLegalDocs] = useState<LegalDocument[]>([]);
  const [legalDocsLoading, setLegalDocsLoading] = useState(false);
  const [legalIngestionProgress, setLegalIngestionProgress] = useState<IngestionProgress | null>(null);
  const [legalForm, setLegalForm] = useState({ name: '', category: 'budowlane' as LegalCategory });
  const legalFileRef = useRef<HTMLInputElement>(null);

  
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
  const [pendingEnrichments, setPendingEnrichments] = useState<any[]>([]);
  const [scriptStatus, setScriptStatus] = useState<EnrichmentStatus | null>(null);
  const [aiStats, setAiStats] = useState<AIMonitoringStats | null>(null);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/enrichment/status');
      if (res.ok) {
        const data = await res.json();
        setScriptStatus(data);
        setPendingEnrichments(data.pending || []);
      }
    } catch (e) {
      console.warn("Failed to fetch enrichment status", e);
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

  const loadKnowledgeBases = async () => {
    setKbLoading(true);
    try {
      const data = await fetchKnowledgeBases();
      setKnowledgeBases(data);
    } catch (err) {
      console.error('Failed to load knowledge bases:', err);
    } finally {
      setKbLoading(false);
    }
  };

  const loadLegalDocs = async () => {
    setLegalDocsLoading(true);
    try {
      const data = await fetchLegalDocuments();
      setLegalDocs(data);
    } catch (err) {
      console.error('Failed to load legal documents:', err);
    } finally {
      setLegalDocsLoading(false);
    }
  };

  const handleToggleLegalDoc = async (id: string, active: boolean) => {
    try {
      await toggleLegalDocActive(id, active);
      loadLegalDocs();
    } catch (err) {
      console.error('Toggle failed', err);
    }
  };

  const handleReindexLegalDoc = async (doc: LegalDocument) => {
    try {
      await reindexLegalDocument(doc);
      loadLegalDocs();
      alert(`Dokument ${doc.name} został przeindeksowany.`);
    } catch (err) {
      console.error('Reindex failed', err);
    }
  };

  const handleDeleteLegalDoc = async (id: string, path: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć ten dokument z bazy RAG?')) return;
    try {
      await deleteLegalDocument(id, path);
      loadLegalDocs();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleKbUpload = async () => {
    const file = kbFileRef.current?.files?.[0];
    if (!file || !kbForm.name.trim()) {
      setKbUploadStatus('error');
      setKbUploadMessage('Wybierz plik i podaj nazwę bazy wiedzy.');
      return;
    }
    setKbUploadStatus('uploading');
    setKbUploadMessage('Przesyłanie pliku do chmury...');
    try {
      await uploadKnowledgeBase(file, kbForm.name, kbForm.version, kbForm.description);
      setKbUploadStatus('success');
      setKbUploadMessage(`Plik "${file.name}" został pomyślnie wgrany!`);
      setKbForm({ name: '', version: '1.0', description: '' });
      if (kbFileRef.current) kbFileRef.current.value = '';
      loadKnowledgeBases();
    } catch (err: any) {
      setKbUploadStatus('error');
      setKbUploadMessage(`Błąd: ${err.message}`);
    }
  };

  const handleKbDownload = async (kb: KnowledgeBase) => {
    try {
      const url = await getDownloadUrl(kb.storage_path);
      const a = document.createElement('a');
      a.href = url;
      a.download = kb.filename;
      a.click();
    } catch (err: any) {
      alert(`Błąd pobierania: ${err.message}`);
    }
  };

  const handleKbToggle = async (kb: KnowledgeBase) => {
    try {
      await toggleKnowledgeBaseActive(kb.id, !kb.is_active);
      loadKnowledgeBases();
    } catch (err: any) {
      alert(`Błąd: ${err.message}`);
    }
  };

  const handleKbDelete = async (kb: KnowledgeBase) => {
    if (!window.confirm(`Usunąć bazę wiedzy "${kb.name}"? Operacja jest nieodwracalna.`)) return;
    try {
      await deleteKnowledgeBase(kb.id, kb.storage_path);
      loadKnowledgeBases();
    } catch (err: any) {
      alert(`Błąd usuwania: ${err.message}`);
    }
  };

  // --- Legal Documents (RAG) Handlers ---

  const handleLegalUpload = async () => {
    const file = legalFileRef.current?.files?.[0];
    if (!file || !legalForm.name.trim()) {
      alert('Wybierz plik PDF i podaj nazwę dokumentu.');
      return;
    }
    if (!file.name.endsWith('.pdf')) {
      alert('Obsługiwane są wyłącznie pliki PDF.');
      return;
    }
    setLegalIngestionProgress({ stage: 'uploading', message: 'Inicjowanie...' });
    try {
      await uploadLegalDocument(
        file,
        legalForm.name,
        legalForm.category,
        (progress) => setLegalIngestionProgress(progress)
      );
      setLegalForm({ name: '', category: 'budowlane' });
      if (legalFileRef.current) legalFileRef.current.value = '';
      loadLegalDocs();
      setTimeout(() => setLegalIngestionProgress(null), 4000);
    } catch (err: any) {
      setLegalIngestionProgress({ stage: 'error', message: `Błąd: ${err.message}` });
    }
  };

  const handleLegalToggle = async (doc: LegalDocument) => {
    try {
      await toggleLegalDocActive(doc.id, !doc.is_active);
      loadLegalDocs();
    } catch (err: any) {
      alert(`Błąd: ${err.message}`);
    }
  };

  const handleLegalReindex = async (doc: LegalDocument) => {
    // Disabled confirm for automated repair
    // if (!window.confirm(`Czy na pewno chcesz ponownie wygenerować indeks dla "${doc.name}"? Spowoduje to wyczyszczenie istniejących i utworzenie nowych fragmentów.`)) return;
    
    setLegalIngestionProgress({ stage: 'downloading', message: 'Inicjowanie naprawy...' });
    try {
      await reindexLegalDocument(doc, (progress) => setLegalIngestionProgress(progress as any));
      loadLegalDocs();
      setTimeout(() => setLegalIngestionProgress(null), 4000);
    } catch (err: any) {
      setLegalIngestionProgress({ stage: 'error', message: `Błąd naprawy: ${err.message}` });
    }
  };

  const handleLegalDelete = async (doc: LegalDocument) => {
    if (!window.confirm(`Usunąć akt prawny "${doc.name}" wraz z ${doc.chunk_count} fragmentami? Operacja jest nieodwracalna.`)) return;
    try {
      await deleteLegalDocument(doc.id, doc.storage_path);
      loadLegalDocs();
    } catch (err: any) {
      alert(`Błąd usuwania: ${err.message}`);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchProfiles();
    } else if (activeTab === 'knowledge') {
      loadKnowledgeBases();
      loadLegalDocs();
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

    // Subscribe to AI Monitoring stats
    const unsubscribeAi = subscribeToAiMonitoring((stats) => {
      setAiStats(stats);
    });

    return () => {
      clearInterval(intervalLogs);
      clearInterval(intervalStatus);
      unsubscribeAi();
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
        <button 
          onClick={() => setActiveTab('knowledge')}
          style={{ padding: '8px 16px', background: activeTab === 'knowledge' ? '#eff6ff' : 'transparent', color: activeTab === 'knowledge' ? '#2563eb' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <BookOpen size={15} />
          Bazy Wiedzy AI
        </button>
        <button 
          onClick={() => setActiveTab('ai_monitor')}
          style={{ padding: '8px 16px', background: activeTab === 'ai_monitor' ? '#fff5f5' : 'transparent', color: activeTab === 'ai_monitor' ? '#ef4444' : '#666', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <Activity size={15} />
          Monitoring AI
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

        {/* WIDOK: KNOWLEDGE BASE */}
        {activeTab === 'knowledge' && (
          <main className="admin-main" style={{ padding: '32px', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: 8, fontSize: '1.5rem', fontWeight: 600 }}>Zarządzanie Bazami Wiedzy AI</h2>
            <p style={{ color: '#64748b', marginBottom: 32, fontSize: '0.9rem' }}>Wgraj nowe pliki źródłowe (.md, .txt, .pdf), które posłużą jako baza wiedzy dla modelu AI w czacie.</p>

            {/* UPLOAD FORM */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 28, marginBottom: 36 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Upload size={18} style={{ color: '#2563eb' }} />
                Wgraj Nową Bazę Wiedzy
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>Nazwa wyświetlana *</label>
                  <input
                    type="text"
                    placeholder="np. cKOB Biblia v2"
                    value={kbForm.name}
                    onChange={e => setKbForm(p => ({ ...p, name: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>Wersja</label>
                  <input
                    type="text"
                    placeholder="np. 1.0"
                    value={kbForm.version}
                    onChange={e => setKbForm(p => ({ ...p, version: e.target.value }))}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>Opis (opcjonalnie)</label>
                <input
                  type="text"
                  placeholder="np. Zaktualizowano o nowe rozporządzenia z 2025"
                  value={kbForm.description}
                  onChange={e => setKbForm(p => ({ ...p, description: e.target.value }))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>Plik źródłowy (.md, .txt, .pdf) *</label>
                <input
                  ref={kbFileRef}
                  type="file"
                  accept=".md,.txt,.pdf"
                  style={{ display: 'block', padding: '8px 0', fontSize: '0.9rem', color: '#334155' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={handleKbUpload}
                  disabled={kbUploadStatus === 'uploading'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: kbUploadStatus === 'uploading' ? '#94a3b8' : '#2563eb',
                    color: 'white', border: 'none', borderRadius: 10,
                    padding: '10px 22px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
                  }}
                >
                  {kbUploadStatus === 'uploading' ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
                  {kbUploadStatus === 'uploading' ? 'Przesyłanie...' : 'Wgraj plik'}
                </button>

                {kbUploadStatus === 'success' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: '0.9rem' }}>
                    <CheckCircle size={16} /> {kbUploadMessage}
                  </div>
                )}
                {kbUploadStatus === 'error' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#ef4444', fontSize: '0.9rem' }}>
                    <AlertCircle size={16} /> {kbUploadMessage}
                  </div>
                )}
              </div>
            </div>

            {/* FILES LIST */}
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={18} style={{ color: '#2563eb' }} />
              Aktualne Bazy Wiedzy ({knowledgeBases.length})
            </h3>

            {kbLoading ? (
              <div style={{ textAlign: 'center', padding: 32, color: '#94a3b8' }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px', display: 'block' }} />
                Ładowanie listy...
              </div>
            ) : knowledgeBases.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: 16 }}>
                <BookOpen size={40} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.4 }} />
                Brak wgranych baz wiedzy. Użyj formularza powyżej.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {knowledgeBases.map(kb => (
                  <div key={kb.id} style={{
                    background: '#fff',
                    border: `1px solid ${kb.is_active ? '#bfdbfe' : '#e2e8f0'}`,
                    borderRadius: 14,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    transition: 'all 0.2s'
                  }}>
                    <div style={{
                      width: 40, height: 40,
                      background: kb.is_active ? '#eff6ff' : '#f8fafc',
                      borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <BookOpen size={20} style={{ color: kb.is_active ? '#2563eb' : '#94a3b8' }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1e293b' }}>{kb.name}</span>
                        <span style={{
                          fontSize: '0.75rem', padding: '2px 8px', borderRadius: 20,
                          background: kb.is_active ? '#dcfce7' : '#f1f5f9',
                          color: kb.is_active ? '#16a34a' : '#64748b',
                          fontWeight: 500
                        }}>
                          {kb.is_active ? 'Aktywna' : 'Nieaktywna'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>v{kb.version}</span>
                      </div>
                      <div style={{ fontSize: '0.83rem', color: '#64748b', marginBottom: 2 }}>
                        📄 {kb.filename}
                        {kb.description && <span style={{ marginLeft: 10, color: '#94a3b8' }}>— {kb.description}</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                        Aktualizacja: {new Date(kb.updated_at).toLocaleString('pl-PL')}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button
                        onClick={() => handleKbDownload(kb)}
                        title="Pobierz"
                        style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: '#334155' }}
                      >
                        <Download size={14} /> Pobierz
                      </button>
                      <button
                        onClick={() => handleKbToggle(kb)}
                        title={kb.is_active ? 'Dezaktywuj' : 'Aktywuj'}
                        style={{ padding: '7px 10px', borderRadius: 8, border: `1px solid ${kb.is_active ? '#bfdbfe' : '#e2e8f0'}`, background: kb.is_active ? '#eff6ff' : '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: kb.is_active ? '#2563eb' : '#64748b' }}
                      >
                        {kb.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                        {kb.is_active ? 'Aktywna' : 'Aktywuj'}
                      </button>
                      <button
                        onClick={() => handleKbDelete(kb)}
                        title="Usuń"
                        style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#ef4444' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ========== LEGAL DOCUMENTS RAG ========== */}
            <div style={{ marginTop: 48, borderTop: '1px solid #e2e8f0', paddingTop: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Scale size={20} style={{ color: '#6366f1' }} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#1e293b' }}>Akty Prawne (Baza RAG)</h3>
                <span style={{ fontSize: 12, background: '#ede9fe', color: '#6366f1', borderRadius: 20, padding: '2px 10px', fontWeight: 600 }}>
                  Wyszukiwanie semantyczne pgvector
                </span>
              </div>

              <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20, lineHeight: 1.6 }}>
                Wgraj akty prawne w formacie PDF. System automatycznie wyekstrahuje tekst, podzieli go na fragmenty 
                według artykułów i wygeneruje embeddingi (Gemini). AI będzie cytować konkretne artykuły w odpowiedziach.
              </p>

              {/* Upload form */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                <h4 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: '#334155' }}>Dodaj nowy akt prawny</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 6 }}>Nazwa aktu prawnego *</label>
                    <input
                      type="text"
                      value={legalForm.name}
                      onChange={e => setLegalForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="np. Prawo Budowlane 2024"
                      disabled={!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 6 }}>Kategoria</label>
                    <select
                      value={legalForm.category}
                      onChange={e => setLegalForm(f => ({ ...f, category: e.target.value as LegalCategory }))}
                      disabled={!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, background: '#fff', boxSizing: 'border-box' }}
                    >
                      {Object.entries(LEGAL_CATEGORIES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 6 }}>Plik PDF *</label>
                  <input
                    ref={legalFileRef}
                    type="file"
                    accept=".pdf"
                    disabled={!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'}
                    style={{ fontSize: 13 }}
                  />
                </div>

                {/* Progress indicator */}
                {legalIngestionProgress && (
                  <div style={{
                    marginBottom: 16,
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: legalIngestionProgress.stage === 'done' ? '#f0fdf4' : legalIngestionProgress.stage === 'error' ? '#fef2f2' : '#eff6ff',
                    border: `1px solid ${legalIngestionProgress.stage === 'done' ? '#bbf7d0' : legalIngestionProgress.stage === 'error' ? '#fecaca' : '#bfdbfe'}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                  }}>
                    {legalIngestionProgress.stage === 'done' && <CheckCircle size={16} style={{ color: '#16a34a', marginTop: 1, flexShrink: 0 }} />}
                    {legalIngestionProgress.stage === 'error' && <AlertCircle size={16} style={{ color: '#dc2626', marginTop: 1, flexShrink: 0 }} />}
                    {legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error' && <Loader2 size={16} style={{ color: '#3b82f6', marginTop: 1, flexShrink: 0, animation: 'spin 1s linear infinite' }} />}
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: legalIngestionProgress.stage === 'done' ? '#16a34a' : legalIngestionProgress.stage === 'error' ? '#dc2626' : '#1d4ed8' }}>
                        {legalIngestionProgress.stage === 'done' ? 'Zakończono!' : legalIngestionProgress.stage === 'error' ? 'Błąd' : 'Przetwarzanie...'}
                      </div>
                      <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                        {legalIngestionProgress.message}
                        {legalIngestionProgress.totalChunks && legalIngestionProgress.stage !== 'done' && (
                          <span> ({legalIngestionProgress.chunk}/{legalIngestionProgress.totalChunks})</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLegalUpload}
                  disabled={!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                    borderRadius: 8, border: 'none', background: '#6366f1', color: '#fff',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: (!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error') ? 0.5 : 1
                  }}
                >
                  {legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'
                    ? <><Loader2 size={16} /> Przetwarzanie (może trwać kilka minut)...</>
                    : <><FileText size={16} /> Wgraj i indeksuj PDF</>
                  }
                </button>
              </div>

              {/* Legal documents list */}
              {legalDocsLoading ? (
                <div style={{ textAlign: 'center', padding: 24, color: '#94a3b8' }}>
                  <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                  <p>Ładowanie aktów prawnych...</p>
                </div>
              ) : legalDocs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 32, color: '#94a3b8', background: '#f8fafc', borderRadius: 12, border: '1px dashed #e2e8f0' }}>
                  <Scale size={32} style={{ marginBottom: 8, opacity: 0.4 }} />
                  <p style={{ margin: 0 }}>Brak wgranych aktów prawnych. Dodaj pierwszy plik PDF powyżej.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {legalDocs.map(doc => (
                    <div key={doc.id} style={{
                      background: '#fff',
                      border: `1px solid ${doc.is_active ? '#c7d2fe' : '#e2e8f0'}`,
                      borderRadius: 10,
                      padding: '14px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}>
                      <FileText size={18} style={{ color: doc.is_active ? '#6366f1' : '#94a3b8', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: 14, color: '#1e293b' }}>{doc.name}</span>
                          <span style={{
                            fontSize: 11, padding: '1px 8px', borderRadius: 20, fontWeight: 500,
                            background: doc.is_active ? '#ede9fe' : '#f1f5f9',
                            color: doc.is_active ? '#6366f1' : '#94a3b8',
                          }}>
                            {doc.is_active ? '● Aktywny' : '○ Nieaktywny'}
                          </span>
                          <span style={{ fontSize: 11, padding: '1px 8px', borderRadius: 20, background: '#f1f5f9', color: '#64748b', fontWeight: 500 }}>
                            {LEGAL_CATEGORIES[doc.category as LegalCategory] || doc.category}
                          </span>
                        </div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>
                          {doc.chunk_count} fragmentów • {new Date(doc.created_at).toLocaleDateString('pl-PL')} • {doc.filename}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                          onClick={() => handleLegalToggle(doc)}
                          style={{
                            padding: '7px 14px', borderRadius: 8, border: `1px solid ${doc.is_active ? '#e2e8f0' : '#c7d2fe'}`,
                            background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                            fontSize: 12, fontWeight: 500, color: doc.is_active ? '#64748b' : '#6366f1'
                          }}
                        >
                          {doc.is_active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                          {doc.is_active ? 'Dezaktywuj' : 'Aktywuj'}
                        </button>
                        
                        {(doc.chunk_count === 0 || doc.is_active) && (
                          <button
                            onClick={() => handleLegalReindex(doc)}
                            title="Wygeneruj ponownie fragmenty i wektory"
                            disabled={!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error'}
                            style={{ 
                              padding: '7px 14px', borderRadius: 8, border: '1px solid #bfdbfe', 
                              background: doc.chunk_count === 0 ? '#fef2f2' : '#fff', cursor: 'pointer', 
                              display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, 
                              color: doc.chunk_count === 0 ? '#dc2626' : '#2563eb',
                              opacity: (!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error') ? 0.5 : 1
                            }}
                          >
                            <RefreshCw size={14} style={{ animation: (!!legalIngestionProgress && legalIngestionProgress.stage !== 'done' && legalIngestionProgress.stage !== 'error') ? 'spin 2s linear infinite' : 'none' }} />
                            {doc.chunk_count === 0 ? 'Napraw Indeks' : 'Re-indeks'}
                          </button>
                        )}

                        <button
                          onClick={() => handleLegalDelete(doc)}
                          title="Usuń"
                          style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* ========== END LEGAL DOCUMENTS ========== */}

            {/* ========== LEGAL DOCUMENTS LIST ========== */}
            <div style={{ marginTop: 24, flex: 1 }}>
              {legalDocs.length === 0 ? (
                <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8', background: '#f8fafc', borderRadius: 12, border: '2px dashed #e2e8f0' }}>
                  Brak wgranych aktów prawnych w bazie RAG.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                  {legalDocs.map(doc => (
                    <div key={doc.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <FileText size={16} style={{ color: '#64748b' }} />
                          <strong style={{ fontSize: 13, color: '#1e293b' }}>{doc.name}</strong>
                        </div>
                        <span style={{ fontSize: 10, background: '#f1f5f9', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{doc.category.toUpperCase()}</span>
                      </div>
                      
                      <div style={{ fontSize: 12, color: '#64748b' }}>
                        Fragmenty: <strong>{doc.chunk_count}</strong> | Wgrano: {new Date(doc.created_at).toLocaleDateString()}
                      </div>

                      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                        <button 
                          onClick={() => handleToggleLegalDoc(doc.id, !doc.is_active)}
                          className={doc.is_active ? "status-btn active" : "status-btn"}
                          style={{ flex: 1, fontSize: 11, padding: '6px' }}
                        >
                          {doc.is_active ? "Aktywny" : "Nieaktywny"}
                        </button>
                        <button 
                          onClick={() => handleReindexLegalDoc(doc)}
                          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}
                          title="Przeindeksuj (RAG)"
                        >
                          <RefreshCw size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteLegalDoc(doc.id, doc.storage_path)}
                          style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #fee2e2', background: '#fff', cursor: 'pointer', color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        )}

        {/* WIDOK: MONITORING AI */}
        {activeTab === 'ai_monitor' && aiStats && (
          <main className="admin-main" style={{ padding: '32px', overflowY: 'auto' }}>
            <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
              <div>
                <h1 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: 4 }}>Panel Monitoringu AI</h1>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nadzór nad kosztami, sesjami i bezpieczeństwem BimOS Intelligence. (Globalny Kill-Switch)</p>
              </div>
              <div className="header-actions" style={{ display: 'flex', gap: 12 }}>
                <button 
                  className="refresh-btn" 
                  onClick={() => {
                    if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki kosztów? Operacja jest nieodwracalna.')) {
                      resetAiMonitoringStats();
                    }
                  }}
                  title="Resetuj statystyki"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer' }}
                >
                  <RefreshCw size={18} /> Resetuj Statystyki
                </button>
              </div>
            </div>

            {/* AI Blocking Banner */}
            {aiStats.isAiDisabled && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg animate-pulse" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Activity size={32} style={{ color: '#ef4444' }} />
                <div>
                  <h3 className="font-bold" style={{ color: '#ef4444', margin: 0 }}>GLOBALNY AI KILL-SWITCH AKTYWNY</h3>
                  <p className="text-sm" style={{ color: '#f87171', margin: 0 }}>Wszystkie procesy AI (Czat, Harvestery, Enrichment) zostały całkowicie zablokowane na poziomie serwera.</p>
                </div>
              </div>
            )}

            <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 32 }}>
              <div className="stat-card premium" style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#3b82f6', marginBottom: 8 }}><DollarSign size={20} /></div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Koszt Sesji (Est.)</div>
                <div style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>${aiStats.totalCost.toFixed(4)}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>~{(aiStats.totalCost * 4.0).toFixed(2)} PLN</div>
              </div>
              
              <div className="stat-card premium" style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#3b82f6', marginBottom: 8 }}><Cpu size={20} /></div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Aktywne Silniki</div>
                <div style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>Gemini 2.5 Flash</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Model VSA Advanced</div>
              </div>
              
              <div className="stat-card premium" style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#3b82f6', marginBottom: 8 }}><Database size={20} /></div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Suma Zapytań</div>
                <div style={{ color: '#0f172a', fontSize: '1.5rem', fontWeight: 700 }}>{Object.values(aiStats.processes).reduce((a, b) => a + b.calls, 0)}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Wszystkie moduły</div>
              </div>
              
              <div className="stat-card premium" style={{ background: '#f8fafc', padding: 20, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ color: '#3b82f6', marginBottom: 8 }}><History size={20} /></div>
                <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>Ostatnie Zapytanie</div>
                <div style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700 }}>
                  {Object.values(aiStats.processes)
                    .filter(p => p.lastActive)
                    .sort((a, b) => new Date(b.lastActive!).getTime() - new Date(a.lastActive!).getTime())[0]?.lastActive 
                      ? new Date(Object.values(aiStats.processes).filter(p => p.lastActive).sort((a, b) => new Date(b.lastActive!).getTime() - new Date(a.lastActive!).getTime())[0].lastActive!).toLocaleTimeString() 
                      : 'Brak'}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>Status: {aiStats.isAiDisabled ? 'OFF' : 'ONLINE'}</div>
              </div>
            </div>

            <div className="table-wrapper premium-table" style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: '#64748b' }}>Moduł / Proces</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: '#64748b' }}>Model AI</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: '#64748b' }}>Wywołania</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: '#64748b' }}>Koszt (USD)</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontSize: '0.75rem', color: '#64748b' }}>Status Systemu</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(aiStats.processes).map(([key, stats]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px', fontWeight: 600, textTransform: 'capitalize' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <ChevronRight size={14} style={{ color: '#3b82f6' }} />
                          {key.replace('_', ' ')}
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}><code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: 4, fontSize: '0.75rem' }}>{stats.model}</code></td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{stats.calls}</td>
                      <td style={{ padding: '16px', color: '#64748b' }}>${stats.estimatedCost.toFixed(5)}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ 
                          padding: '4px 10px', 
                          borderRadius: 20, 
                          fontSize: '0.7rem', 
                          fontWeight: 700,
                          background: stats.status === 'ACTIVE' ? '#dcfce7' : stats.status === 'DISABLED' ? '#fee2e2' : '#f1f5f9',
                          color: stats.status === 'ACTIVE' ? '#166534' : stats.status === 'DISABLED' ? '#991b1b' : '#64748b'
                        }}>
                          {stats.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="flex flex-col sm:flex-row gap-4" style={{ display: 'flex', gap: 16 }}>
                {!aiStats.isAiDisabled ? (
                  <button
                    onClick={async () => {
                      if (confirm('UWAGA: To natychmiast ZABIJE wszystkie aktywne procesy AI i zablokuje zapytania Gemini. Czy kontynuować?')) {
                        await stopAllAiActiveProcesses();
                      }
                    }}
                    style={{ flex: 1, padding: '16px', background: '#ef4444', color: 'white', fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', gap: 8 }}
                  >
                    <Activity size={20} /> Emergency Kill-Switch (GLOBALNY)
                  </button>
                ) : (
                  <button
                    onClick={enableAiActiveProcesses}
                    style={{ flex: 1, padding: '16px', background: '#10b981', color: 'white', fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifySelf: 'center', gap: 8 }}
                  >
                    <Zap size={20} /> Przywróć działanie AI (Sygnał START)
                  </button>
                )}
              </div>

              <div style={{ padding: 20, background: '#f0f9ff', borderRadius: 12, border: '1px solid #bae6fd' }}>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0369a1', display: 'flex', gap: 8 }}>
                  <Plus size={16} /> 
                  <span>
                    <strong>System Globalnej Blokady:</strong> Aktywacja Kill-Switcha tworzy fizyczny plik <code>.AI_DISABLED</code> na serwerze. 
                    Każdy harvester newsów, skrypt wzbogacania inżynierów oraz sesja czatu sprawdza ten plik przed wywołaniem API. 
                    Gwarantuje to 100% ochrony przed nieplanowanymi kosztami.
                  </span>
                </p>
              </div>
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
