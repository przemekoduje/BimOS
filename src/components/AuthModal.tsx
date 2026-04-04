import React, { useState } from 'react';
import { X, Layers } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './AuthModal.css';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      showToast(err.message || 'Błąd logowania przez Google.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = () => {
    showToast('Logowanie przez Apple jest jeszcze w trakcie konfiguracji.');
  };

  const showToast = (text: string, type: 'error' | 'success' = 'error') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAuth = async (mode: 'magic' | 'password' = 'magic') => {
    if (!email) {
      showToast('Wprowadź e-mail.');
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!password) {
          showToast('Wprowadź hasło dla nowego konta.');
          setIsLoading(false);
          return;
        }
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        if (error) throw error;
        showToast('Konto utworzone! Sprawdź e-mail, aby potwierdzić.', 'success');
        return;
      }

      if (mode === 'password') {
        if (!showPassword) {
          setShowPassword(true);
          setIsLoading(false);
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        onSuccess(email);
      } else {
        // Magic Link
        const { error } = await supabase.auth.signInWithOtp({ 
          email,
          options: {
            emailRedirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
        
        showToast('Link logowania został wysłany na Twój e-mail!', 'success');
      }
    } catch (err: any) {
      showToast(err.message || 'Wystąpił błąd autoryzacji.');
    } finally {
      setIsLoading(false);
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
              <button className="auth-btn auth-btn-google" onClick={handleGoogleLogin} disabled={isLoading}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff"/>
                </svg>
                Kontynuuj z Google
              </button>
              <button className="auth-btn auth-btn-apple" onClick={handleAppleLogin} disabled={isLoading}>
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
            <div className="auth-login-options">
              {isSignUp ? (
                <div className="auth-signup-group">
                  <input 
                    type="password" 
                    className="auth-input" 
                    placeholder="Wybierz hasło (min. 6 znaków)" 
                    value={password}
                    autoFocus
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth('password')}
                    style={{ marginTop: 8 }}
                  />
                  <button 
                    className={`auth-btn auth-btn-email ${email && password.length >= 6 ? 'active' : ''}`}
                    onClick={() => handleAuth('password')}
                    style={{ marginTop: 8 }}
                    disabled={isLoading}
                  >
                    {isLoading ? <div className="mini-loader"></div> : 'Utwórz konto'}
                  </button>
                </div>
              ) : (
                !showPassword ? (
                  <div className="auth-dual-buttons">
                    <button 
                      className={`auth-btn auth-btn-email ${email ? 'active' : ''}`}
                      onClick={() => handleAuth('magic')}
                      disabled={isLoading}
                    >
                      {isLoading ? <div className="mini-loader"></div> : 'Wyślij Link'}
                    </button>
                    <button 
                      className={`auth-btn auth-btn-password-toggle ${email ? 'active' : ''}`}
                      onClick={() => setShowPassword(true)}
                      disabled={isLoading}
                    >
                      Zaloguj hasłem
                    </button>
                  </div>
                ) : (
                  <div className="auth-password-group">
                    <input 
                      type="password" 
                      className="auth-input" 
                      placeholder="Wprowadź swoje hasło" 
                      value={password}
                      autoFocus
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuth('password')}
                      style={{ marginTop: 8 }}
                    />
                    <button 
                      className="auth-btn auth-btn-email active"
                      onClick={() => handleAuth('password')}
                      style={{ marginTop: 8 }}
                      disabled={isLoading}
                    >
                      {isLoading ? <div className="mini-loader"></div> : 'Zaloguj'}
                    </button>
                    <button 
                      className="auth-back-to-magic"
                      onClick={() => { setShowPassword(false); setPassword(''); }}
                      style={{ marginTop: 12, background: 'none', border: 'none', color: '#666', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Powrót do logowania linkiem
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
          
          <div className="auth-mode-toggle">
            {isSignUp ? (
              <span>Masz już konto? <button onClick={() => setIsSignUp(false)}>Zaloguj się</button></span>
            ) : (
              <span>Nie masz konta? <button onClick={() => setIsSignUp(true)}>Zarejestruj się</button></span>
            )}
          </div>
          
          <a href="#" className="auth-sso-link" onClick={(e) => { e.preventDefault(); handleGoogleLogin(); }}>Jednolity dostęp (SSO)</a>
          
          {toastMessage && (
            <div className={`auth-toast ${toastMessage.type}`} style={{
              marginTop: 16, padding: '12px', 
              background: toastMessage.type === 'error' ? '#fee2e2' : '#dcfce7', 
              color: toastMessage.type === 'error' ? '#991b1b' : '#166534', 
              fontSize: '0.85rem', borderRadius: 6, textAlign: 'center',
              animation: 'fadeIn 0.2s'
            }}>
              {toastMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
