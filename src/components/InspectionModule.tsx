import { useState } from 'react';
import CameraCapture from './CameraCapture';
import './InspectionModule.css';

export default function InspectionModule() {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'camera'>('list');

  return (
    <div className="inspection-container">
      <div className="inspection-header">
        <h2>Przeglądy Budowlane (Moduł AI)</h2>
        <div className="inspection-actions">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            Moje Przeglądy
          </button>
          <button 
            className={`tab-btn primary ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            + Nowy Przegląd
          </button>
        </div>
      </div>

      <div className="inspection-content">
        {activeTab === 'list' && (
          <div className="empty-state">
            <h3>Brak aktywnych przeglądów</h3>
            <p>Kliknij "Nowy Przegląd", aby zaimportować archiwalny PDF i rozpocząć oględziny.</p>
          </div>
        )}

        {activeTab === 'new' && (
          <div className="new-inspection-wizard">
            <h3>Krok 1: Wgraj archiwalny protokół (PDF)</h3>
            <p className="wizard-desc">
              System AI odczyta z archiwalnego dokumentu wszystkie punkty kontrolne (np. dach, rynny, instalacje), aby upewnić się, że nie pominiesz żadnego z nich podczas dzisiejszych oględzin na obiekcie.
            </p>
            <div className="upload-area">
              <label className="upload-btn">
                Wybierz plik PDF
                <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    alert('Funkcja analizy PDF przez AI zostanie wkrótce podłączona! Wybrano: ' + e.target.files[0].name);
                  }
                }} />
              </label>
              <span className="upload-hint">Lub przeciągnij i upuść tutaj plik z zeszłego roku.</span>
            </div>

            <div className="wizard-actions">
              <button className="primary-btn start-camera-btn" onClick={() => setActiveTab('camera')}>
                Przejdź do oględzin (Aparat) 📸
              </button>
            </div>
          </div>
        )}

        {activeTab === 'camera' && (
          <CameraCapture 
            onBack={() => setActiveTab('new')} 
            onFinish={(captures) => {
              console.log("Zebrane materiały do analizy: ", captures);
              alert(`Oględziny zakończone! Przekazano ${captures.length} plików do silnika AI... (Wkrótce)`);
              setActiveTab('list');
            }}
          />
        )}
      </div>
    </div>
  );
}
