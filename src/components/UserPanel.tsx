import React, { useState } from 'react';
import { LogOut, ChevronUp, Settings, Key } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getDisplayNameFromEmail, getInitials } from '../utils/userUtils';
import './UserPanel.css';

interface UserPanelProps {
  email: string;
  isExpanded: boolean;
  onLogout: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ email, isExpanded, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSettingPassword, setIsSettingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const name = getDisplayNameFromEmail(email);
  const initials = getInitials(name);

  const handleSetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setStatus({ text: 'Hasło musi mieć min. 6 znaków', type: 'error' });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      setStatus({ text: 'Hasło zostało ustawione!', type: 'success' });
      setNewPassword('');
      setTimeout(() => {
        setIsSettingPassword(false);
        setStatus(null);
      }, 2000);
    } catch (err: any) {
      setStatus({ text: err.message || 'Błąd ustawiania hasła', type: 'error' });
    }
  };

  return (
    <div className={`user-panel-container ${isExpanded ? 'expanded' : ''}`}>
      {showMenu && isExpanded && (
        <div className="user-panel-menu fade-in">
          <div className="menu-header">
            <span className="menu-title">Profil Inżyniera</span>
          </div>
          <button className="menu-item" onClick={() => setIsSettingPassword(!isSettingPassword)}>
            <Key size={16} /> <span>{isSettingPassword ? 'Anuluj' : 'Ustaw Hasło'}</span>
          </button>
          
          {isSettingPassword && (
            <div className="password-mini-form">
              <input 
                type="password" 
                className="mini-input" 
                placeholder="Nowe hasło" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button className="mini-submit" onClick={handleSetPassword}>Ustaw</button>
              {status && <div className={`mini-status ${status.type}`}>{status.text}</div>}
            </div>
          )}
          
          <button className="menu-item">
            <Settings size={16} /> <span>Ustawienia Systemu</span>
          </button>
          <div className="menu-divider" />
          <button className="menu-item logout" onClick={onLogout}>
            <LogOut size={16} /> <span>Wyloguj się</span>
          </button>
        </div>
      )}

      <div 
        className="user-profile-bar"
        onClick={() => isExpanded && setShowMenu(!showMenu)}
      >
        <div className="user-avatar">
          {initials}
        </div>
        
        {isExpanded && (
          <div className="user-info">
            <span className="user-name">{name}</span>
            <span className="user-email">{email}</span>
          </div>
        )}

        {isExpanded && (
          <div className={`user-chevron ${showMenu ? 'open' : ''}`}>
            <ChevronUp size={16} />
          </div>
        )}
      </div>

      {!isExpanded && (
        <button 
          className="user-logout-small" 
          onClick={onLogout}
          title="Wyloguj się"
        >
          <LogOut size={18} />
        </button>
      )}
    </div>
  );
};

export default UserPanel;
