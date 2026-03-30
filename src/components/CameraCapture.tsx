import { useState, useRef } from 'react';
import { verifyConstruction, verifyProtocolDocument, verifyToolReading } from '../services/aiService';
import type { VerificationResult } from '../services/aiService';
import './CameraCapture.css';

type AnalysisMode = 'construction' | 'protocol' | 'tool';

interface Captures {
  id: string;
  type: 'video' | 'image';
  url: string;
  notes: string;
  aiResult?: VerificationResult;
  isAnalyzing?: boolean;
}

interface CameraCaptureProps {
  onBack: () => void;
  onFinish: (captures: Captures[]) => void;
}

export default function CameraCapture({ onBack, onFinish }: CameraCaptureProps) {
  const [captures, setCaptures] = useState<Captures[]>([]);
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('construction');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');

      setCaptures(prev => [
        ...prev, 
        { id: Date.now().toString(), type: isVideo ? 'video' : 'image', url, notes: '' }
      ]);
    }
  };

  const updateNotes = (id: string, notes: string) => {
    setCaptures(prev => prev.map(c => c.id === id ? { ...c, notes } : c));
  };

  const removeCapture = (id: string) => {
    setCaptures(prev => prev.filter(c => c.id !== id));
  };

  const handleAiVerification = async (capture: Captures) => {
    if (capture.type === 'video') {
      alert("Analiza wideo przez AI: Funkcja wkrótce dostępna dla Gemini Pro Vision.");
      return;
    }

    setCaptures(prev => prev.map(c => c.id === capture.id ? { ...c, isAnalyzing: true } : c));

    try {
      // Convert blob URL to base64
      const response = await fetch(capture.url);
      const blob = await response.blob();
      const reader = new FileReader();
      
      const base64: string = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      let result;
      if (analysisMode === 'construction') {
        result = await verifyConstruction(base64);
      } else if (analysisMode === 'protocol') {
        result = await verifyProtocolDocument(base64);
      } else {
        result = await verifyToolReading(base64);
      }
      
      setCaptures(prev => prev.map(c => c.id === capture.id ? { 
        ...c, 
        aiResult: result, 
        isAnalyzing: false,
        notes: analysisMode === 'construction' 
          ? `[Filar ${result.pillar}] ${result.findings.join('\n')}` 
          : analysisMode === 'protocol'
            ? `Protokół ${result.protocolInfo?.type}: ${result.protocolInfo?.isCurrent ? 'Aktualny' : 'Przeterminowany'} (Ważny do: ${result.protocolInfo?.validUntil}).\n${result.findings.join('\n')}`
            : `Odczyt: ${result.value} ${result.unit}\nNarzędzie: ${result.toolType}\nObs: ${result.observation}`
      } : c));

    } catch (error) {
      console.error("AI Analysis failed:", error);
      setCaptures(prev => prev.map(c => c.id === capture.id ? { ...c, isAnalyzing: false } : c));
      alert("Błąd analizy AI. Sprawdź konsolę.");
    }
  };

  const hasPendingFollowUp = captures.some(c => c.aiResult?.requiresFollowUp);


  return (
    <div className="camera-capture-container">
      <div className="capture-header">
        <button className="back-btn" onClick={onBack}>← Wróć</button>
        <h2>Oględziny Terenowe</h2>
        <div className="analysis-mode-selector">
          <button 
            className={`mode-btn ${analysisMode === 'construction' ? 'active' : ''}`}
            onClick={() => setAnalysisMode('construction')}
          >🏗️ Konstrukcja</button>
          <button 
            className={`mode-btn ${analysisMode === 'protocol' ? 'active' : ''}`}
            onClick={() => setAnalysisMode('protocol')}
          >📄 Protokół</button>
          <button 
            className={`mode-btn ${analysisMode === 'tool' ? 'active' : ''}`}
            onClick={() => setAnalysisMode('tool')}
          >📏 Narzędzia</button>
        </div>
        <span className="capture-count">{captures.length} plików</span>
      </div>

      <div className="capture-actions">
        <input 
          type="file" 
          accept="image/*,video/*" 
          capture="environment" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleCapture}
        />
        <div className="capture-btn-wrapper">
          <button 
            className={`capture-btn primary ${hasPendingFollowUp ? 'pulse-alert' : ''}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <span className="camera-icon">📸</span>
            {hasPendingFollowUp ? 'WYKONAJ ZDJĘCIE UZUPEŁNIAJĄCE' : 'Nagraj / Zrób Zdjęcie'}
          </button>
          {hasPendingFollowUp && (
            <div className="ar-bubble-hint">
              AI wykryło wadę krytyczną. Zrób dodatkowe zbliżenie!
            </div>
          )}
        </div>
      </div>

      <div className="captures-list">
        {captures.length === 0 ? (
          <div className="empty-captures">
            Naciśnij aparat by uruchomić skaner telefonu i uwiecznić usterki. Pamiętaj, aby opisywać je również głosem!
          </div>
        ) : (
          captures.map(capture => (
            <div key={capture.id} className="capture-item">
              <div className="capture-preview">
                {capture.type === 'video' ? (
                  <video src={capture.url} controls className="preview-media" />
                ) : (
                  <img src={capture.url} alt="Usterka" className="preview-media" />
                )}
                <button 
                  className={`ai-verify-btn ${capture.isAnalyzing ? 'loading' : ''} ${capture.aiResult ? 'has-result' : ''}`}
                  onClick={() => handleAiVerification(capture)}
                  disabled={capture.isAnalyzing}
                >
                  {capture.isAnalyzing ? 'Analiza...' : capture.aiResult ? '🔍 Zobacz wynik AI' : '🪄 Analizuj AI'}
                </button>
                {capture.aiResult?.requiresFollowUp && (
                  <div className="ar-alert-bubble">
                    <span className="alert-icon">⚠️</span>
                    {capture.aiResult.alertMessage}
                  </div>
                )}
              </div>
              <div className="capture-details">
                {capture.aiResult && (
                  <div className={`ai-result-badge ${analysisMode === 'construction' || analysisMode === 'protocol' ? capture.aiResult.status?.toLowerCase() : 'success'}`}>
                    Status AI: {analysisMode === 'construction' ? capture.aiResult.status : analysisMode === 'protocol' ? 'PROTOKÓŁ' : 'ODCZYT'}
                  </div>
                )}
                <textarea 
                  placeholder="Zanotuj spostrzeżenia lub pozostaw pole puste – AI wygeneruje opis na podstawie wideo i głosu."
                  value={capture.notes}
                  onChange={(e) => updateNotes(capture.id, e.target.value)}
                  className="capture-notes"
                />
                <button className="delete-btn" onClick={() => removeCapture(capture.id)}>Usuń</button>
              </div>
            </div>
          ))
        )}
      </div>

      {captures.length > 0 && (
        <div className="capture-footer">
          <button 
            className="finish-inspection-btn" 
            onClick={() => onFinish(captures)}
            disabled={hasPendingFollowUp}
          >
            {hasPendingFollowUp ? '⚠️ Dokumentacja Niekompletna' : 'Generuj Protokół AI 🪄'}
          </button>
        </div>
      )}
    </div>
  );
}
