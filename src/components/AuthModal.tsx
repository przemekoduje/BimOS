import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import './AuthModal.css';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const ADMIN_EMAIL = 'przemek.rakotny@gmail.com';
  const ADMIN_PASS = 'admin123'; // Dla celów testowych/MVP

  const handleSsoClick = () => {
    setToastMessage('W obszarze darmowych testów, logowanie przez SSO (B2B) jest tymczasowo wyłączone.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAuth = () => {
    if (!email) return;

    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      if (!showPassword) {
        setShowPassword(true);
        return;
      }
      if (password === ADMIN_PASS) {
        onSuccess(email);
      } else {
        setToastMessage('Nieprawidłowe hasło administratora.');
        setTimeout(() => setToastMessage(null), 3000);
      }
    } else {
      // Inni użytkownicy - sam email wystarczy
      onSuccess(email);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <X size={18} />
        </button>
        
        <div className="auth-modal-body">
          <div className="auth-icon-wrapper">
            <Layers size={32} strokeWidth={1.5} />
          </div>
          
          <h2 className="auth-title">Zaloguj się lub utwórz konto</h2>
          <p className="auth-subtitle">Zapisuj i synchronizuj swoje<br />wyszukiwania</p>
          
          {!showPassword && (
            <div className="auth-buttons-group">
              <button className="auth-btn auth-btn-google" onClick={handleSsoClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                </svg>
                Kontynuuj z Google
              </button>
              <button className="auth-btn auth-btn-apple" onClick={handleSsoClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.4 12.3c0-1.8 1.4-2.8 1.5-2.8-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.7-3.2.7-.7 0-1.7-.7-2.8-.7-1.3 0-2.6.8-3.4 2-1.3 2.1-3 6.1-1.3 9 1 1.6 2 3.1 3.5 3.1 1.5 0 2-1 3.8-1 1.7 0 2.2.9 3.8.9 1.6 0 2.6-1.4 3.5-2.8.9-1.5 1.1-2.9 1.1-3-.1 0-2.5-.9-2.5-3.8z" fill="#1a1a1a"/>
                  <path d="M14.6 6.1c.8-1 1.3-2.4 1.2-3.8-1.2.1-2.7.8-3.5 1.8-.7.8-1.2 2.2-1.1 3.6 1.4.1 2.7-.6 3.4-1.6z" fill="#1a1a1a"/>
                </svg>
                Kontynuuj z Apple
              </button>
            </div>
          )}
          
          <div className="auth-email-group">
            <input 
              type="email" 
              className="auth-input" 
              placeholder="Wprowadź swój e-mail" 
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              disabled={showPassword}
            />
            {showPassword && (
              <input 
                type="password" 
                className="auth-input" 
                placeholder="Wprowadź hasło admina" 
                value={password}
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                style={{ marginTop: 8 }}
              />
            )}
            <button 
              className={`auth-btn auth-btn-email ${email ? 'active' : ''}`}
              onClick={handleAuth}
              style={{ marginTop: 8 }}
            >
              {showPassword ? 'Zaloguj jako Admin' : 'Kontynuuj z e-mailem'}
            </button>
          </div>
          
          <a href="#" className="auth-sso-link" onClick={(e) => { e.preventDefault(); handleSsoClick(); }}>Jednolity dostęp (SSO)</a>
          
          {toastMessage && (
            <div style={{
              marginTop: 16, padding: '12px', background: '#fee2e2', color: '#991b1b', 
              fontSize: '0.85rem', borderRadius: 6, textAlign: 'center',
              animation: 'fadeIn 0.2s'
            }}>
              {toastMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
