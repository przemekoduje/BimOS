import { useState, useEffect, useRef } from 'react';
import { inspectionStore } from '../services/inspectionStore';
import { analyzeLiveVideoFrame, askAdHocQuestion } from '../services/aiService';
import type { LiveFeedItem } from '../services/inspectionStore';
import './LiveInspection.css';

interface LiveInspectionProps {
  onBack: () => void;
  onFinish: () => void;
}

export default function LiveInspection({ onBack, onFinish }: LiveInspectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [arBox, setArBox] = useState<any>(null); // Bounding box state from continuous scan
  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([]);
  
  // Modale
  const [showAdhoc, setShowAdhoc] = useState(false);
  const [adhocImage, setAdhocImage] = useState<string | null>(null);
  const [adhocText, setAdhocText] = useState("");
  const [isAdhocLoading, setIsAdhocLoading] = useState(false);

  // Safety Gate
  const [showSafetyGate, setShowSafetyGate] = useState(false);
  const [missingZones, setMissingZones] = useState<string[]>([]);

  // Camera setup
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("No camera access", err);
        alert("Brak dostępu do kamery. Widok symulowany.");
      }
    }
    setupCamera();

    return () => {
      // Cleanup
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continuous AR Radar Scan
  useEffect(() => {
    let intervalId: any;
    
    const scanFrame = async () => {
      if (!isRecording || !videoRef.current || !canvasRef.current) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video.videoWidth === 0) return; // Wait until video is ready
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/jpeg', 0.5);
        
        try {
          const result = await analyzeLiveVideoFrame(base64);
          if (result && result.detected) {
            setArBox({
              ...result.ar_bounding_box,
              severity: result.severity,
              label: result.ai_analysis,
              size: result.estimated_size
            });

            // Automatically log to inspection store
            const newFeedItem = inspectionStore.addLiveFeedItem({
              source: 'auto-detect',
              ai_analysis: result.ai_analysis,
              severity: result.severity,
              estimated_size: result.estimated_size,
              ar_bounding_box: result.ar_bounding_box
            });
            setLiveFeed(prev => [...prev, newFeedItem]);

            // Clear box after 4 seconds
            setTimeout(() => setArBox(null), 4000);
          }
        } catch (err) {
          console.error("Auto scan error", err);
        }
      }
    };

    if (isRecording) {
      intervalId = setInterval(scanFrame, 4000); // Skanuj co 4 sekundy żeby nie zużyć całego API
    }

    return () => clearInterval(intervalId);
  }, [isRecording]);

  // Sync feed items with store
  useEffect(() => {
    setLiveFeed(inspectionStore.getLiveFeedItems());
    
    // Safety check - what is missing from pre-inspection context?
    const missing = inspectionStore.getMissingMandatoryZones();
    setMissingZones(missing);
  }, []);

  // AD HOC Logika
  const handleOpenAdHoc = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      setAdhocImage(canvas.toDataURL('image/jpeg', 0.8));
    }
    setShowAdhoc(true);
  };

  const submitAdHoc = async () => {
    if (!adhocImage || !adhocText) return;
    setIsAdhocLoading(true);
    try {
      const result = await askAdHocQuestion(adhocImage, adhocText);
      
      const newFeedItem = inspectionStore.addLiveFeedItem({
        source: 'ad-hoc',
        transcription: adhocText,
        ai_analysis: result.ai_analysis,
        severity: result.severity,
        estimated_size: result.estimated_size,
        ar_bounding_box: result.ar_bounding_box
      });
      
      setLiveFeed(prev => [...prev, newFeedItem]);
      
      // Pokazujemy wyłapany Box w głównym oknie na chwilę
      if (result.ar_bounding_box) {
        setArBox({
          ...result.ar_bounding_box,
          severity: result.severity,
          label: result.ai_analysis,
          size: result.estimated_size
        });
        setTimeout(() => setArBox(null), 5000);
      }
      
    } catch (err) {
      console.error(err);
      alert("Błąd przetwarzania pytania Ad-hoc");
    } finally {
      setIsAdhocLoading(false);
      setShowAdhoc(false);
      setAdhocText("");
    }
  };

  const attemptFinish = () => {
    const missing = inspectionStore.getMissingMandatoryZones();
    if (missing.length > 0) {
      setMissingZones(missing);
      setShowSafetyGate(true);
    } else {
      onFinish();
    }
  };

  // Mock zones helper (to remove zones from missing list as we walk)
  const simulateVisitingZone = (zone: string) => {
    inspectionStore.markZoneVisited(zone);
    setMissingZones(inspectionStore.getMissingMandatoryZones());
  };

  return (
    <div className="live-inspection-container">
      {/* Viewfinder (Video) */}
      <div className="camera-viewfinder">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="live-video-feed"
          style={{ transform: stream ? '' : 'scale(1.2)' }} // just visual scaling if using fallback placeholder
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        
        {/* AR Bounding Box Overlay */}
        {arBox && (
          <div 
            className={`bounding-box-ar ${arBox.severity}`}
            style={{
              left: `${arBox.x * 100}%`,
              top: `${arBox.y * 100}%`,
              width: `${arBox.width * 100}%`,
              height: `${arBox.height * 100}%`
            }}
          >
            <div className="bounding-label">{arBox.label}</div>
            {arBox.size && <div className="ar-measurement">{arBox.size}</div>}
          </div>
        )}
      </div>

      {/* HUD OVERLAY */}
      <div className="ar-hud-overlay">
        <div className="hud-header">
          <button className="btn-glass" onClick={onBack}>← Wróć</button>
          
          {isRecording ? (
            <div className="recording-indicator">
              <div className="red-dot"></div> Nagrywanie AR Aktywne
            </div>
          ) : (
             <div className="recording-indicator" style={{opacity: 0.5}}>Standby</div>
          )}

          {/* Safety Gate Warning Panel */}
          <div className="safety-gate-card">
            <h4>Checklista Stref (Z historii):</h4>
            <ul>
              {missingZones.length === 0 ? (
                <li className="visited">✔️ Wszystko odwiedzone</li>
              ) : (
                missingZones.map(z => (
                  <li key={z} onClick={() => simulateVisitingZone(z)} style={{cursor: 'pointer'}} title="Kliknij by zasymulować wejście do strefy">
                     ⚠️ Brak: {z}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Live Sidebar (Feed history) */}
        <div className="live-feed-sidebar">
          {liveFeed.slice(-4).map((item) => (
             <div key={item.id} className={`feed-item ${item.severity}`}>
                <span className="feed-time">{new Date(item.timestamp).toLocaleTimeString([],{hour:'2-digit', minute:'2-digit', second:'2-digit'})}</span>
                {item.transcription && <strong>[Q]: {item.transcription} </strong>}
                {item.ai_analysis}
             </div>
          ))}
        </div>

        <div className="hud-footer">
          <button 
            className={`btn-glass ${isRecording ? 'danger' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? "⬛ Stop AR" : "🔴 Start AR Radar"}
          </button>
          
          <button className="btn-glass primary" onClick={handleOpenAdHoc} disabled={!isRecording}>
            🗣️ Pytanie Ad-hoc
          </button>
          
          <button className="btn-glass" onClick={attemptFinish}>
            ✅ Zakończ Oględziny
          </button>
        </div>
      </div>

      {/* Modal: Pytanie Ad-Hoc */}
      {showAdhoc && (
        <div className="adhoc-modal-overlay">
          <div className="adhoc-modal-content">
            <h3 style={{marginTop:0}}>Zapytaj AI (Ad-hoc)</h3>
            <p style={{fontSize: '0.85rem', opacity: 0.8}}>Zamrożono klatkę. AI przeanalizuje wymiary i stan na podstawie Twojego pytania.</p>
            {adhocImage && <img src={adhocImage} alt="Snapshot" className="adhoc-preview" />}
            
            <input 
              type="text" 
              className="adhoc-input"
              placeholder="Np. Oceń rozwarcie tej rysy na ścianie"
              value={adhocText}
              onChange={e => setAdhocText(e.target.value)}
              disabled={isAdhocLoading}
              autoFocus
            />

            {isAdhocLoading ? (
              <div className="loading-pulse">Trwa analiza obrazu przez Gemini Flash 2.0...</div>
            ) : (
              <div className="modal-actions">
                <button className="btn-glass" onClick={() => setShowAdhoc(false)}>Anuluj</button>
                <button className="btn-glass primary" onClick={submitAdHoc}>Analizuj</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal: Safety Gate */}
      {showSafetyGate && (
        <div className="safety-modal-overlay">
          <div className="safety-modal-content">
            <h3>⚠️ Ostrzeżenie z bazy historii</h3>
            <p>Pominąłeś weryfikację krytycznych stref zaleconych w archiwum (Art. 62):</p>
            <ul style={{textAlign: 'left', background: 'rgba(255,0,0,0.1)', padding:'1rem', borderRadius:'8px', listStyle:'none'}}>
              {missingZones.map(z => <li key={z}>• {z}</li>)}
            </ul>
            <p>Zakończenie teraz może wiązać się z odpowiedzialnością inżynierską. Czy chcesz celowo pominąć te elementy?</p>
            
            <div className="modal-actions">
              <button className="btn-glass primary" onClick={() => setShowSafetyGate(false)}>← Wróć do oględzin</button>
              <button className="btn-glass danger" onClick={() => {
                setShowSafetyGate(false);
                onFinish();
              }}>
                Pomiń ryzykując
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
