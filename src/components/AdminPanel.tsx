import React, { useEffect, useState } from 'react';
import { fetchEngineers, type Engineer } from '../services/engineerService';
import { Search, Download, RefreshCw, UserCheck } from 'lucide-react';
import './AdminPanel.css';

const AdminPanel: React.FC = () => {
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

  useEffect(() => {
    fetchEngineers().then(data => {
      setEngineers(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    let result = engineers.filter(e => 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.licenseNumber.toLowerCase().includes(search.toLowerCase())
    );

    if (filters.province) {
      result = result.filter(e => e.province === filters.province);
    }
    if (filters.speciality) {
      result = result.filter(e => e.speciality.includes(filters.speciality));
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
    <div className="admin-container">
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
          <button className="export-btn">
            <Download size={18} />
            Eksportuj CSV
          </button>
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
                <th>Akcje</th>
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
                  <td>
                    <button className="action-btn">Wzbogać AI</button>
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
    </div>
  );
};

export default AdminPanel;
