import { useState, useRef } from 'react';
import './CameraCapture.css';

interface Captures {
  id: string;
  type: 'video' | 'image';
  url: string;
  notes: string;
}

interface CameraCaptureProps {
  onBack: () => void;
  onFinish: (captures: Captures[]) => void;
}

export default function CameraCapture({ onBack, onFinish }: CameraCaptureProps) {
  const [captures, setCaptures] = useState<Captures[]>([]);
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

  return (
    <div className="camera-capture-container">
      <div className="capture-header">
        <button className="back-btn" onClick={onBack}>← Wróć</button>
        <h2>Oględziny Terenowe</h2>
        <span className="capture-count">{captures.length} plików</span>
      </div>

      <div className="capture-actions">
        {/* Hidden input taking advantage of HTML5 `capture` attribute */}
        <input 
          type="file" 
          accept="image/*,video/*" 
          capture="environment" 
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleCapture}
        />
        <button 
          className="capture-btn primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <span className="camera-icon">📸</span>
          Nagraj / Zrób Zdjęcie
        </button>
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
              </div>
              <div className="capture-details">
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
          <button className="finish-inspection-btn" onClick={() => onFinish(captures)}>
            Generuj Protokół AI 🪄
          </button>
        </div>
      )}
    </div>
  );
}
