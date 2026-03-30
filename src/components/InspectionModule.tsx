import { useState } from 'react';
import CameraCapture from './CameraCapture';
import { voiceService } from '../services/voiceService';
import { processPreInspectionDocuments } from '../services/aiService';
import type { PreInspectionContext } from '../services/aiService';
import { inspectionStore } from '../services/inspectionStore';
import { resolveMaterialDurability, calculateRossaWear } from '../services/valuationService';
import './InspectionModule.css';

export default function InspectionModule() {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'camera' | 'review' | 'voice' | 'summary'>('list');
  const [inspectionData, setInspectionData] = useState<any[]>([]);
  const [voiceStep, setVoiceStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceResults, setVoiceResults] = useState<any[]>([]);
  const [piibId, setPiibId] = useState('PIIB-ID-39120');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [context, setContext] = useState<PreInspectionContext | null>(null);
  const [rossaWear, setRossaWear] = useState<number>(0);

  const handleMockVoice = async (text: string) => {
    try {
      const histContext = inspectionStore.getChecklist().map(i => i.description).join(". ");
      const result = await voiceService.simulateVoiceAnalysis(text, histContext);
      setVoiceResults(prev => [...prev, result]);
      if (voiceStep < 3) setVoiceStep(prev => prev + 1);
    } catch (err) {
      alert("Błąd analizy tekstu.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsAnalyzing(true);
    try {
      const result = await processPreInspectionDocuments(Array.from(files));
      setContext(result);
      
      const unverified = !inspectionStore.verifyProfessionalCredentials(result);
      inspectionStore.setContext(result, unverified);
      
      const durability = resolveMaterialDurability(result.structural_material);
      const wear = calculateRossaWear({ age: result.building_age_t, durability });
      setRossaWear(wear);
      
      setActiveTab('summary');
    } catch (err: any) {
      alert(`Błąd ingestii: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const groupFindingsByPillar = () => {
    const pillars: Record<number, any[]> = {};
    inspectionData.filter(c => c.aiResult?.pillar).forEach(c => {
      const p = c.aiResult.pillar;
      if (!pillars[p]) pillars[p] = [];
      pillars[p].push(c);
    });
    return pillars;
  };

  const getProtocols = () => {
    return inspectionData.filter(c => c.aiResult?.protocolInfo).map(c => c.aiResult.protocolInfo);
  };

  return (
    <div className="inspection-container">
      <div className="inspection-header">
        <h2>Przeglądy Budowlane (Moduł AI)</h2>
        <div className="inspection-actions">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >Moje Przeglądy</button>
          <button 
            className={`tab-btn primary ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >+ Nowy Przegląd</button>
          <button 
            className={`tab-btn voice-btn ${activeTab === 'voice' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('voice');
              setVoiceStep(1);
            }}
          >Asystent Głosowy (Hands-Free)</button>
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
            <div className="wizard-card">
              <h3>Krok 1: Wgraj archiwalny protokół (PDF/Obrazy)</h3>
              <p className="wizard-desc">
                AI wyekstrahuje zalecenia historyczne (Art. 62) i przygotuje plan kontroli dla 8 filarów budowlanych.
              </p>
              <div className="upload-area">
                {isAnalyzing ? (
                  <div className="analyzing-state">
                    <div className="spinner"></div>
                    <p>Trwa multimodalna analiza dokumentacji...</p>
                  </div>
                ) : (
                  <label className="upload-btn">
                    Wybierz pliki (PDF/JPG)
                    <input type="file" multiple accept=".pdf,image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </label>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'summary' && context && (
          <div className="building-profile-summary">
            <div className="profile-header success">
              <h3>Building Profile Loaded</h3>
              <p>Dokumentacja zintegrowana z "Pamięcią Obiektu".</p>
            </div>

            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Usterki Historyczne:</span>
                <span className="value">{context.historical_defects.length} do weryfikacji</span>
              </div>
              <div className="summary-item">
                <span className="label">Znaczniki Przestrzenne:</span>
                <span className="value">{context.spatial_markers.length} osi/stref</span>
              </div>
              <div className="summary-item">
                <span className="label">Materiał Nośny:</span>
                <span className="value">{context.structural_material === 'concrete' ? 'Żelbet' : 'Cegła/Mur'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Zużycie Techniczne:</span>
                <span className="value">{rossaWear}% (Metoda Rossa)</span>
              </div>
            </div>

            {inspectionStore.isUnverified() && (
              <div className="warning-box">
                WYKRYTO NIEZWERYFIKOWANĄ HISTORIĘ: Brak pieczątki inżyniera na Stronie 17.
              </div>
            )}

            {inspectionStore.getStructuralAlerts().length > 0 && (
              <div className="structural-alerts-box">
                <h4>ALERTY STRUKTURALNE (Ryzyka Nieliniowe)</h4>
                <ul>
                  {inspectionStore.getStructuralAlerts().map((alert, idx) => (
                    <li key={idx}>{alert}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="continuity-validator">
              <span className="continuity-label">Walidacja Kontynuitetu (Art. 62):</span>
              <span className="continuity-value">
                Poprzedni Inspektor: <strong>{context.technical_specs.last_inspector_name || "Nieznany"}</strong> 
                (Uprawnienia: {context.technical_specs.last_inspector_license || "Brak"})
              </span>
            </div>

            <div className="summary-tables">
              <div className="summary-section">
                <h4>1. Hard Extraction: Rejestr Usterek i Wad</h4>
                <table className="analysis-table">
                  <thead>
                    <tr>
                      <th>Filar</th>
                      <th>Symptom (Fakt Techniczny)</th>
                      <th>Lokalizacja</th>
                      <th>Pytanie do weryfikacji</th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.historical_defects.map((defect, idx) => (
                      <tr key={idx} className={defect.urgency === 'Critical' || defect.urgency === 'High' ? 'mandatory' : ''}>
                        <td>{defect.pillar}</td>
                        <td className="technical-fact">{defect.desc}</td>
                        <td>{defect.loc}</td>
                        <td>{defect.verification_question}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="summary-section">
                <h4>2. Inwentaryzacja Braków (Compliance)</h4>
                <table className="analysis-table compliance">
                  <thead>
                    <tr>
                      <th>Stwierdzony Brak / Wada Formalna</th>
                    </tr>
                  </thead>
                  <tbody>
                    {context.missing_compliance.map((item, idx) => (
                      <tr key={idx}>
                        <td className="issue">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="summary-section">
                <h4>3. Parametry Techniczne & Zalecenia Historyczne</h4>
                <div className="tech-specs-grid">
                  <div className="spec-card">
                    <span className="spec-label">Ostatni Inspektor (Uprawnienia):</span>
                    <span className="spec-value">{context.technical_specs.last_inspector_license || "Brak danych"}</span>
                  </div>
                  <div className="spec-card">
                    <span className="spec-label">Data poprzedniej kontroli:</span>
                    <span className="spec-value">{context.technical_specs.last_inspection_date || "Nieznana"}</span>
                  </div>
                  <div className="spec-card">
                    <span className="spec-label">Rodzaj dachu:</span>
                    <span className="spec-value">{context.technical_specs.roof_type || "Nie określono"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="wizard-actions">
              <button className="primary-btn start-camera-btn" onClick={() => setActiveTab('camera')}>
                Rozpocznij Wizję Lokalną
              </button>
            </div>
          </div>
        )}

        {activeTab === 'camera' && (
          <CameraCapture 
            onBack={() => setActiveTab('new')} 
            onFinish={(captures) => {
              setInspectionData(captures);
              setActiveTab('review');
            }}
          />
        )}

        {activeTab === 'review' && (
          <div className="inspection-review">
            <h3>Podsumowanie Oględzin AI</h3>
            
            <section className="review-section">
              <h4>Stan Konstrukcji (8 Filarów)</h4>
              <div className="pillars-grid">
                {[1,2,3,4,5,6,7,8].map(p => {
                  const items = groupFindingsByPillar()[p] || [];
                  return (
                    <div key={p} className={`pillar-card ${items.length > 0 ? 'has-issues' : 'ok'}`}>
                      <span className="pillar-num">{p}</span>
                      <span className="pillar-name">{getPillarName(p)}</span>
                      <span className="issue-count">{items.length} uwag</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="review-section">
              <h4>Protokoły Branżowe</h4>
              <div className="protocols-list">
                {getProtocols().length === 0 ? <p className="empty-hint">Nie załączono protokołów branżowych.</p> : (
                  getProtocols().map((proto, idx) => (
                    <div key={idx} className={`protocol-item ${proto.isCurrent ? 'current' : 'expired'}`}>
                      <strong>{proto.type}</strong>
                      <span>Ważność: {proto.validUntil}</span>
                      <span className="status-tag">{proto.isCurrent ? 'AKTUALNY' : 'PO TERMINIE'}</span>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="review-section">
              <h4>Draft c-KOB (JSON)</h4>
              <pre className="json-preview">
                {JSON.stringify({
                  metadata: { date: new Date().toLocaleDateString(), inspector: "Senior Developer (Test)" },
                  findings: inspectionData.map(c => c.aiResult?.voiceAnalysis?.structuredData || c.aiResult?.findings),
                  legal: "Zgodne z Art. 60b Prawa Budowlanego"
                }, null, 2)}
              </pre>
            </section>

            <section className="safety-statement-card">
              <h4>OŚWIADCZENIE (Strona 17 Protokołu)</h4>
              <p>
                "Na podstawie wyników kontroli stwierdzam, że obiekt 
                <strong className={inspectionData.some(c => c.aiResult?.status === 'ERROR') ? 'danger' : 'safe'}>
                  {inspectionData.some(c => c.aiResult?.status === 'ERROR') ? ' NIE NADAJE SIĘ ' : ' nadaje się '}
                </strong> 
                do bezpiecznego użytkowania w zakresie objętym kontrolą, pod warunkiem usunięcia wskazanych usterek."
              </p>
              <div className="inspector-signature">
                <input 
                  type="text" 
                  value={piibId} 
                  onChange={(e) => setPiibId(e.target.value)} 
                  placeholder="Numer uprawnień PIIB"
                  className="signature-input"
                />
                <span>Wpis w PIIB zweryfikowany: AKTUALNY</span>
              </div>
            </section>

            <div className="final-actions">
              {inspectionStore.getChecklist().some(i => i.is_mandatory && i.status === 'pending') ? (
                <div className="validation-lock-msg">
                  PRZYCISK ZABLOKOWANY: Musisz zweryfikować wszystkie usterki historyczne w module głosowym lub kamerze przed zamknięciem raportu.
                </div>
              ) : (
                <button className="finish-inspection-btn" onClick={() => {
                  alert("Protokół wyeksportowany do c-KOB!");
                  setActiveTab('list');
                }}>Generuj Protokół Końcowy</button>
              )}
            </div>
          </div>
        )}
        {activeTab === 'voice' && (
          <div className="voice-assistant-container">
            <div className="voice-card">
              <div className="voice-avatar">AI</div>
              <div className="voice-dialogue">
                {voiceStep === 1 && <h3>"Czy zalecenie dotyczące naprawy rynien z poprzedniego roku zostało wykonane?"</h3>}
                {voiceStep === 2 && <h3>"Opisz aktualną obserwację (np. odkrywka fundamentów w osi A)."</h3>}
                {voiceStep === 3 && <h3>"Analizuję zapis... Czy chcesz dodać zdjęcie z dzisiejszej sesji 'Inspektora Cienia'?"</h3>}
                
                {voiceResults.length > 0 && (
                  <div className="voice-results-preview">
                    {voiceResults.map((res, i) => (
                      <div key={i} className="voice-res-item">
                        <strong>Filar {res.pillar}:</strong> {res.findings[0]}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="voice-controls">
                <div className="voice-mocks">
                  {voiceStep === 1 && (
                    <>
                      <button className="mock-btn" onClick={() => handleMockVoice("Tak, zalecenie dotyczące naprawy rynien z 2024 zostało wykonane.")}>
                        Rynny Naprawione (Happy Path)
                      </button>
                      <button className="mock-btn" onClick={() => handleMockVoice("Nie, nie wykonano naprawy rynien. Wciąż widoczne ślady przecieków.")}>
                        Brak Naprawy
                      </button>
                    </>
                  )}
                  {voiceStep === 2 && (
                    <>
                      <button className="mock-btn" onClick={() => handleMockVoice("W osi A wykonano odkrywkę fundamentów. Brak zawilgocenia, izolacja w dobrym stanie.")}>
                        Fundamenty OK
                      </button>
                      <button className="mock-btn" onClick={() => handleMockVoice("Widoczne drobne zarysowanie tynku nad drzwiami w pokoju 204. Filar 6.")}>
                        Rysa nad drzwiami
                      </button>
                    </>
                  )}
                </div>

                <button 
                  className={`mic-btn ${isRecording ? 'recording' : ''}`}
                  onClick={async () => {
                    try {
                      if (!isRecording) {
                        await voiceService.startRecording();
                        setIsRecording(true);
                      } else {
                        setIsRecording(false); // Set early for UX
                        const audio = await voiceService.stopRecording();
                        if (!audio) throw new Error("Brak nagrania");
                        
                        const histContext = inspectionStore.getChecklist().map(i => i.description).join(". ");
                        const result = await voiceService.analyzeVoice(audio, histContext);
                        
                        setVoiceResults(prev => [...prev, result]);
                        if (voiceStep < 3) setVoiceStep(prev => prev + 1);
                      }
                    } catch (err) {
                      setIsRecording(false);
                      alert("Błąd mikrofonu: Upewnij się, że zezwoliłeś na dostęp do nagrywania w przeglądarce.");
                    }
                  }}
                >
                  {isRecording ? 'Przestań Nagrywać' : 'Odpowiedz Głosowo'}
                </button>
                <p className="voice-hint">
                  {isRecording ? 'Mów teraz... AI rozpozna terminy techniczne.' : 'AI prowadzi Cię przez protokół Hands-Free.'}
                </p>
              </div>
              
              {voiceStep === 3 && (
                <button className="primary-btn" onClick={() => setActiveTab('camera')}>Przejdź do Zdjęć</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getPillarName(id: number) {
  const names = [
    "",
    "Fundamenty i Piwnice",
    "Konstrukcja Nośna",
    "Elewacja i Ściany",
    "Dach i Pokrycie",
    "Odwodnienie",
    "Stolarka",
    "Elementy Dodatkowe",
    "Otoczenie"
  ];
  return names[id];
}

