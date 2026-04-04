import { useState, useEffect, useRef } from 'react'
import { Layers, Search, Compass, Settings, LogIn, PanelLeftClose, PanelLeftOpen, Share2, Trash2, Pin, MoreVertical, Copy, Mail, MessageCircle, X, ExternalLink, Folder as FolderIcon, FolderPlus, ChevronRight, ChevronDown } from 'lucide-react'
import { supabase } from './lib/supabase'
import { fetchUserChats, type ChatSession } from './services/aiService'
import SearchHero from './components/SearchHero'
import AdminPanel from './components/AdminPanel'
import UserPanel from './components/UserPanel'
import DiscoverDashboard from './components/DiscoverDashboard'
import NewsDetail from './components/NewsDetail'
import AuthModal from './components/AuthModal'
import './index.css'

interface Folder {
  id: string;
  name: string;
  isExpanded: boolean;
}

// Custom ShareModal Component
const ShareModal = ({ chat, onClose }: { chat: ChatSession, onClose: () => void }) => {
  return (
    <div className="share-modal-overlay" onClick={onClose}>
      <div className="share-modal-content" onClick={e => e.stopPropagation()}>
        <div className="share-modal-header">
          <h3>Udostępnij czat</h3>
          <button className="share-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <p className="share-modal-subtitle">"{chat.title}"</p>
        
        <div className="share-options-grid">
          <button className="share-option-btn" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link skopiowany do schowka!');
          }}>
            <div className="share-icon-circle copy"><Copy size={20} /></div>
            <span>Kopiuj link</span>
          </button>
          
          <a 
            className="share-option-btn" 
            href={`mailto:?subject=${encodeURIComponent(chat.title)}&body=${encodeURIComponent("Check out this BimOS chat: " + window.location.href)}`}
          >
            <div className="share-icon-circle mail"><Mail size={20} /></div>
            <span>E-mail</span>
          </a>
          
          <a 
            className="share-option-btn" 
            href={`https://wa.me/?text=${encodeURIComponent(chat.title + ": " + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="share-icon-circle whatsapp"><MessageCircle size={20} /></div>
            <span>WhatsApp</span>
          </a>

          <a 
            className="share-option-btn" 
            href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(chat.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="share-icon-circle telegram"><ExternalLink size={20} /></div>
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [view, setView] = useState<'search' | 'admin' | 'discover'>('search');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [shareModalChat, setShareModalChat] = useState<ChatSession | null>(null);
  const [localPinnedIds, setLocalPinnedIds] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('bimos_local_pins') || '[]'));
    } catch {
      return new Set();
    }
  });

  const [folders, setFolders] = useState<Folder[]>(() => {
    const stored = localStorage.getItem('bimos_folders');
    return stored ? JSON.parse(stored) : [];
  });

  const [folderMappings, setFolderMappings] = useState<Record<string, string>>(() => {
    const stored = localStorage.getItem('bimos_folder_mappings');
    return stored ? JSON.parse(stored) : {};
  });

  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [tempFolderName, setTempFolderName] = useState('');
  
  const [chatOrder, setChatOrder] = useState<string[]>(() => {
    const stored = localStorage.getItem('bimos_chat_order');
    return stored ? JSON.parse(stored) : [];
  });

  const [dropTarget, setDropTarget] = useState<{ id: string, position: 'top' | 'bottom' } | null>(null);
  const draggedChatIdRef = useRef<string | null>(null);

  const ADMIN_EMAIL = 'przemek.rakotny@gmail.com';

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsLoggedIn(true);
        setUserEmail(session.user.email || '');
        loadChatHistory();
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('BimOS Auth Event:', _event);
      if (session?.user) {
        const email = session.user.email || '';
        setIsLoggedIn(true);
        setUserEmail(email);
        
        // Only switch to admin view ON SIGN IN, not on session refresh
        if (email === ADMIN_EMAIL && _event === 'SIGNED_IN') {
          setView('admin');
        }
        loadChatHistory();
      } else if (_event === 'SIGNED_OUT') {
        // Only reset view on EXPLICIT sign out, not on session transient nulls
        setIsLoggedIn(false);
        setUserEmail('');
        setView('search');
        setActiveChatId(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('bimos_local_pins', JSON.stringify([...localPinnedIds]));
  }, [localPinnedIds]);

  useEffect(() => {
    localStorage.setItem('bimos_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('bimos_folder_mappings', JSON.stringify(folderMappings));
  }, [folderMappings]);

  useEffect(() => {
    localStorage.setItem('bimos_chat_order', JSON.stringify(chatOrder));
  }, [chatOrder]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const loadChatHistory = async () => {
    try {
      const chats = await fetchUserChats();
      setChatRooms(chats);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('search');
  };

  const handleLoginSuccess = (email: string) => {
    setShowAuthModal(false);
    if (email === ADMIN_EMAIL) {
      setView('admin');
    } else {
      setView('search');
    }
  };

  const handleNewsClick = (id: string) => {
    setSelectedNewsId(id);
  };

  const handleBackToDiscover = () => {
    setSelectedNewsId(null);
  };

  const handleRename = async (id: string) => {
    if (!tempTitle.trim()) {
      setEditingChatId(null);
      return;
    }
    try {
      const { updateChat } = await import('./services/aiService');
      await updateChat(id, { title: tempTitle });
      setChatRooms(prev => prev.map(c => c.id === id ? { ...c, title: tempTitle } : c));
    } catch (err) {
      console.error(err);
    } finally {
      setEditingChatId(null);
    }
  };

  const handleTogglePin = async (chat: ChatSession) => {
    const isCurrentlyPinned = chat.is_pinned || localPinnedIds.has(chat.id);
    const newPinned = !isCurrentlyPinned;
    
    try {
      const { updateChat } = await import('./services/aiService');
      await updateChat(chat.id, { is_pinned: newPinned });
      setChatRooms(prev => prev.map(c => c.id === chat.id ? { ...c, is_pinned: newPinned } : c));
      
      if (localPinnedIds.has(chat.id)) {
        setLocalPinnedIds(prev => {
          const next = new Set(prev);
          next.delete(chat.id);
          return next;
        });
      }
    } catch (err: any) {
      console.error('Błąd podczas przypinania:', err);
      if (err.code === 'PGRST204' || (err.message && err.message.includes('is_pinned'))) {
        setLocalPinnedIds(prev => {
          const next = new Set(prev);
          if (newPinned) next.add(chat.id);
          else next.delete(chat.id);
          return next;
        });
      }
    }
  };

  const handleCreateFolder = () => {
    const newFolder: Folder = {
      id: 'f' + Date.now(),
      name: 'Nowy Folder',
      isExpanded: true
    };
    setFolders(prev => [newFolder, ...prev]);
    setEditingFolderId(newFolder.id);
    setTempFolderName('Nowy Folder');
  };

  const handleToggleFolder = (id: string) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, isExpanded: !f.isExpanded } : f));
  };

  const handleDeleteFolder = (id: string) => {
    if (!window.confirm("Czy usunąć folder? Czaty zostaną przeniesione na listę główną.")) return;
    setFolders(prev => prev.filter(f => f.id !== id));
    setFolderMappings(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(chatId => {
        if (next[chatId] === id) delete next[chatId];
      });
      return next;
    });
  };

  const handleRenameFolder = (id: string) => {
    if (!tempFolderName.trim()) {
      setEditingFolderId(null);
      return;
    }
    setFolders(prev => prev.map(f => f.id === id ? { ...f, name: tempFolderName } : f));
    setEditingFolderId(null);
  };

  // DND Handlers
  const onDragStart = (e: React.DragEvent, chatId: string) => {
    console.log('BimOS: Dragging chat', chatId);
    draggedChatIdRef.current = chatId;
    e.dataTransfer.setData('text/plain', chatId); // Still set it for native UI
    e.dataTransfer.effectAllowed = 'move';
    // Visual drag feedback
    const target = e.currentTarget as HTMLElement;
    target.classList.add('is-dragging');
  };

  const onDragEnd = (e: React.DragEvent) => {
    draggedChatIdRef.current = null;
    setDragOverFolderId(null);
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('is-dragging');
  };

  const onDragOverFolder = (e: React.DragEvent, folderId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverFolderId !== folderId) {
      setDragOverFolderId(folderId);
    }
  };

  const onDragOverItem = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedChatIdRef.current === targetId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const midPoint = rect.top + rect.height / 2;
    const position = e.clientY < midPoint ? 'top' : 'bottom';
    
    if (!dropTarget || dropTarget.id !== targetId || dropTarget.position !== position) {
      setDropTarget({ id: targetId, position });
    }
  };

  const onDropOnItem = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const draggedId = draggedChatIdRef.current || e.dataTransfer.getData('text/plain');
    if (!draggedId || draggedId === targetId || draggedId === 'drag') return;

    // 1. Move to the folder/root of the target item
    const targetFolderId = folderMappings[targetId] || null;
    setFolderMappings(prev => {
      const next = { ...prev };
      if (targetFolderId) next[draggedId] = targetFolderId;
      else delete next[draggedId];
      return next;
    });

    // 2. Perform reordering
    setChatOrder(prev => {
      const filtered = prev.filter(id => id !== draggedId);
      // Ensure targetId is in the list (fallback if not present yet)
      const visibleIds = chatRooms.map(c => c.id);
      let listToWorkWith = [...filtered];
      if (!listToWorkWith.includes(targetId)) {
        // Find existing index in original list or just append
        listToWorkWith = [...visibleIds.filter(id => id !== draggedId)];
      }

      const targetIdx = listToWorkWith.indexOf(targetId);
      const insertAt = dropTarget?.position === 'top' ? targetIdx : targetIdx + 1;
      
      const nextOrder = [...listToWorkWith];
      nextOrder.splice(insertAt, 0, draggedId);
      return nextOrder;
    });

    setDropTarget(null);
    setDragOverFolderId(null);
    draggedChatIdRef.current = null;
  };

  const onDropOnFolder = (e: React.DragEvent, folderId: string | null) => {
    e.preventDefault();
    e.stopPropagation();
    setDropTarget(null);
    
    // Use ref first, fallback to dataTransfer
    const chatId = draggedChatIdRef.current || e.dataTransfer.getData('text/plain');
    
    console.log('BimOS: Drop on folder detected', { chatId, folderId });
    if (!chatId || chatId === 'drag') {
      console.warn('BimOS: Invalid chatId found in drop data');
      return;
    }

    setFolderMappings(prev => {
      const next = { ...prev };
      if (folderId) next[chatId] = folderId;
      else delete next[chatId];
      return next;
    });
    setDragOverFolderId(null);
    draggedChatIdRef.current = null;
    
    // Expand folder if dropped into it
    if (folderId) {
      setFolders(prev => prev.map(f => f.id === folderId ? { ...f, isExpanded: true } : f));
    }
  };

  const getSortedChats = (chats: ChatSession[]) => {
    return [...chats].sort((a, b) => {
      const aPinned = a.is_pinned || localPinnedIds.has(a.id);
      const bPinned = b.is_pinned || localPinnedIds.has(b.id);
      
      // Pins always first
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;

      // Then by custom order
      const aIdx = chatOrder.indexOf(a.id);
      const bIdx = chatOrder.indexOf(b.id);
      
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;

      // Fallback to date
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę rozmowę?")) return;
    try {
      const { deleteChat } = await import('./services/aiService');
      await deleteChat(id);
      setChatRooms(prev => prev.filter(c => c.id !== id));
      if (activeChatId === id) setActiveChatId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = (chat: ChatSession) => {
    setOpenMenuId(null);
    setShareModalChat(chat);
  };

  const renderChatItem = (chat: ChatSession) => (
    <div 
      key={chat.id} 
      className={`sidebar-history-item-container ${activeChatId === chat.id ? 'active' : ''} ${(chat.is_pinned || localPinnedIds.has(chat.id)) ? 'pinned' : ''} ${dropTarget?.id === chat.id ? `drop-indicator-${dropTarget.position}` : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, chat.id)}
      onDragEnd={(e) => { onDragEnd(e); setDropTarget(null); }}
      onDragOver={(e) => onDragOverItem(e, chat.id)}
      onDrop={(e) => onDropOnItem(e, chat.id)}
      onDragLeave={() => setDropTarget(null)}
    >
      <div 
        className="sidebar-history-item" 
        onClick={(e) => { 
          e.stopPropagation();
          setView('search'); 
          setSelectedNewsId(null); 
          setActiveChatId(chat.id);
        }}
        role="button"
        tabIndex={0}
      >
        {editingChatId === chat.id ? (
          <input
            autoFocus
            className="rename-input"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onBlur={() => handleRename(chat.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRename(chat.id);
              if (e.key === 'Escape') setEditingChatId(null);
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span className="sidebar-history-text">{chat.title}</span>
        )}
      </div>
      
      <div className="chat-menu-wrapper">
        <button 
          className={`chat-menu-trigger ${(chat.is_pinned || localPinnedIds.has(chat.id)) ? 'is-pinned-state' : ''} ${openMenuId === chat.id ? 'active' : ''}`}
          onClick={(e) => { 
            e.stopPropagation(); 
            setOpenMenuId(openMenuId === chat.id ? null : chat.id); 
          }}
        >
          {(chat.is_pinned || localPinnedIds.has(chat.id)) ? (
            <>
              <Pin size={12} className="pin-icon-visible" fill="currentColor" />
              <MoreVertical size={14} className="more-icon-hover" />
            </>
          ) : (
            <MoreVertical size={14} />
          )}
        </button>

        {openMenuId === chat.id && (
          <div className="chat-dropdown-menu fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className={`dropdown-item ${ (chat.is_pinned || localPinnedIds.has(chat.id)) ? 'pinned' : ''}`}
              onClick={() => { handleTogglePin(chat); setOpenMenuId(null); }}
            >
              <Pin size={14} fill={(chat.is_pinned || localPinnedIds.has(chat.id)) ? "currentColor" : "none"} />
              <span>{(chat.is_pinned || localPinnedIds.has(chat.id)) ? 'Odepnij' : 'Przypnij'}</span>
            </button>
            <button 
              className="dropdown-item"
              onClick={() => { setEditingChatId(chat.id); setTempTitle(chat.title); setOpenMenuId(null); }}
            >
              <Settings size={14} />
              <span>Zmień nazwę</span>
            </button>
            <button 
              className="dropdown-item"
              onClick={() => { handleShare(chat); }}
            >
              <Share2 size={14} />
              <span>Udostępnij</span>
            </button>
            <div className="dropdown-divider"></div>
            <button 
              className="dropdown-item delete"
              onClick={() => { handleDelete(chat.id); setOpenMenuId(null); }}
            >
              <Trash2 size={14} />
              <span>Usuń</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' }}>
        <div className="spinning-loader"></div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <div className="sidebar-top">
          <div className="sidebar-logo" onClick={() => { setView('search'); setActiveChatId(null); }}>
            <Layers size={28} strokeWidth={1.5} className="sidebar-icon-main" />
            <span className="sidebar-text title-text">BimOS</span>
          </div>

          <nav className="sidebar-nav">
            <button 
              className="sidebar-link"
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              style={{ marginBottom: '12px' }}
            >
              {isSidebarExpanded ? <PanelLeftClose size={22} strokeWidth={1.5} className="sidebar-icon" /> : <PanelLeftOpen size={22} strokeWidth={1.5} className="sidebar-icon" />}
              <span className="sidebar-text" style={{ fontWeight: 600 }}>{isSidebarExpanded ? 'Zwiń' : 'Rozwiń'}</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'search' && !activeChatId ? 'active' : ''}`}
              onClick={() => { setView('search'); setSelectedNewsId(null); setActiveChatId(null); }}
            >
              <Search size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Szukaj (cKOB)</span>
            </button>
            <button 
              className={`sidebar-link ${view === 'discover' ? 'active' : ''}`}
              onClick={() => { setView('discover'); setSelectedNewsId(null); }}
            >
              <Compass size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Odkrywaj</span>
            </button>
          </nav>

          {isLoggedIn && isSidebarExpanded && (
            <div className="sidebar-history fade-in">
              <div className="sidebar-history-header">
                <div className="sidebar-history-title">Ostatnie rozmowy</div>
                <button className="add-folder-btn" onClick={handleCreateFolder} title="Nowy folder">
                  <FolderPlus size={16} />
                </button>
              </div>

              <div 
                className={`sidebar-history-list ${dragOverFolderId === 'root' ? 'drag-over' : ''}`}
                onDragOver={(e) => onDragOverFolder(e, 'root')}
                onDragEnter={(e) => onDragOverFolder(e, 'root')}
                onDrop={(e) => onDropOnFolder(e, null)}
              >
                {/* Render Folders */}
                {folders.map(folder => {
                  const itemsInFolder = getSortedChats(chatRooms.filter(c => folderMappings[c.id] === folder.id));
                  return (
                    <div 
                      key={folder.id} 
                      className={`sidebar-folder-group ${folder.isExpanded ? 'is-expanded' : ''} ${dragOverFolderId === folder.id ? 'drag-over' : ''}`}
                      onDragOver={(e) => onDragOverFolder(e, folder.id)}
                      onDragEnter={(e) => onDragOverFolder(e, folder.id)}
                      onDrop={(e) => onDropOnFolder(e, folder.id)}
                    >
                      <div className="sidebar-folder-row" onClick={() => handleToggleFolder(folder.id)}>
                        <div className="folder-title">
                          <span className="folder-chevron">
                            {folder.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </span>
                          <FolderIcon size={16} className="folder-icon" />
                          {editingFolderId === folder.id ? (
                            <input
                              autoFocus
                              className="folder-rename-input"
                              value={tempFolderName}
                              onChange={(e) => setTempFolderName(e.target.value)}
                              onBlur={() => handleRenameFolder(folder.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleRenameFolder(folder.id);
                                if (e.key === 'Escape') setEditingFolderId(null);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          ) : (
                            <span className="folder-name-text">{folder.name}</span>
                          )}
                        </div>
                        <div className="folder-actions" onClick={e => e.stopPropagation()}>
                          <button 
                            className="folder-action-btn" 
                            onClick={() => { setEditingFolderId(folder.id); setTempFolderName(folder.name); }}
                          >
                            <Settings size={12} />
                          </button>
                          <button className="folder-action-btn delete" onClick={() => handleDeleteFolder(folder.id)}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>

                      {folder.isExpanded && (
                        <div className="folder-content fade-in">
                          {itemsInFolder.length > 0 ? (
                            itemsInFolder.map(chat => renderChatItem(chat))
                          ) : (
                            <div className="folder-empty">Pusty folder</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Render Root Level Chats (Unassigned) */}
                {getSortedChats(chatRooms.filter(c => !folderMappings[c.id]))
                  .map(chat => renderChatItem(chat))}

                {chatRooms.length === 0 && folders.length === 0 && (
                  <div className="sidebar-no-chats">Brak historii rozmów</div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="sidebar-bottom">
          {userEmail === ADMIN_EMAIL && (
            <button 
              className={`sidebar-link ${view === 'admin' ? 'active' : ''}`}
              onClick={() => setView('admin')}
            >
              <Settings size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Panel Admina</span>
            </button>
          )}
          
          {isLoggedIn ? (
            <UserPanel 
              email={userEmail} 
              isExpanded={isSidebarExpanded} 
              onLogout={handleLogout} 
            />
          ) : (
            <button className="sidebar-link" onClick={() => setShowAuthModal(true)}>
              <LogIn size={22} strokeWidth={1.5} className="sidebar-icon" />
              <span className="sidebar-text">Logowanie</span>
            </button>
          )}
        </div>
      </aside>
      
      <main className="main-content">
        {!isLoggedIn ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#666' }}>
            <Layers size={64} style={{ marginBottom: 24, opacity: 0.2 }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 500, marginBottom: 12 }}>Witaj w BimOS</h2>
            <p style={{ maxWidth: 400, textAlign: 'center', lineHeight: 1.6 }}>Zaloguj się, aby uzyskać dostęp do bazy wiedzy cKOB oraz platformy inżynierskiej.</p>
            <button 
              onClick={() => setShowAuthModal(true)}
              style={{ marginTop: 24, padding: '12px 24px', background: '#2563eb', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Zaloguj się teraz
            </button>
          </div>
        ) : (
          <>
            {view === 'search' && (
              <SearchHero 
                chatId={activeChatId} 
                onChatCreated={(newId) => {
                  setActiveChatId(newId);
                  loadChatHistory();
                }} 
              />
            )}
            {view === 'admin' && <AdminPanel />}
            {view === 'discover' && (
              selectedNewsId ? (
                <NewsDetail id={selectedNewsId} onBack={handleBackToDiscover} />
              ) : (
                <DiscoverDashboard onCardClick={handleNewsClick} />
              )
            )}
          </>
        )}
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={handleLoginSuccess} />}
      {shareModalChat && <ShareModal chat={shareModalChat} onClose={() => setShareModalChat(null)} />}

      <style>{`
        .app {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background-color: var(--bg-primary, #ffffff);
        }

        .sidebar {
          width: 72px;
          height: 100vh;
          background: #f9f9f9;
          border-right: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 0;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .sidebar.expanded {
          width: 250px;
          box-shadow: 4px 0 24px rgba(0,0,0,0.04);
        }

        .sidebar-top, .sidebar-bottom {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sidebar-top {
          flex: 1;
          min-height: 0;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          padding: 0 22px;
          margin-bottom: 32px;
          cursor: pointer;
          color: #1a1a1a;
          min-width: 250px;
        }
        
        .sidebar-icon-main {
          flex-shrink: 0;
          margin-left: 2px;
        }

        .title-text {
          font-weight: 600 !important;
          font-size: 1.25rem !important;
          margin-left: 14px !important;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          min-width: 250px;
          transition: background 0.2s, color 0.2s;
          text-align: left;
        }

        .sidebar-link:hover {
          background: rgba(0,0,0,0.04);
          color: #1a1a1a;
        }

        .sidebar-link.active {
          color: #2563eb;
          font-weight: 600;
        }

        .sidebar-text {
          margin-left: 16px;
          font-size: 0.95rem;
          white-space: nowrap;
          opacity: 0;
          font-weight: 500;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar.expanded .sidebar-text {
          opacity: 1;
        }

        .sidebar-history {
          margin-top: 24px;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
        }

        .sidebar-history-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #999;
          font-weight: 600;
          margin-bottom: 12px;
          padding-left: 8px;
          letter-spacing: 0.5px;
        }

        .sidebar-history-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
          flex: 1;
          padding-right: 4px;
        }

        .sidebar-history-item-container {
          position: relative;
          margin-bottom: 2px;
          border-radius: 12px;
          transition: all 0.2s;
        }

        .sidebar-history-item-container.drop-indicator-top::before {
          content: "";
          position: absolute;
          top: -2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
          z-index: 10;
        }

        .sidebar-history-item-container.drop-indicator-bottom::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 12px;
          right: 12px;
          height: 2px;
          background: #2563eb;
          border-radius: 2px;
          z-index: 10;
        }

        .sidebar-history-item-container:hover {
          background: rgba(0,0,0,0.03);
        }

        .sidebar-history-item-container.active {
          background: #e8ebf2;
        }

        .sidebar-history-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 8px;
          margin-bottom: 12px;
        }

        .add-folder-btn {
          background: transparent;
          border: none;
          color: #999;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .add-folder-btn:hover {
          background: rgba(0,0,0,0.05);
          color: #111;
        }

        .sidebar-folder-group {
          margin-bottom: 2px;
          border-radius: 12px;
          transition: background 0.2s;
        }

        .sidebar-folder-group.drag-over {
          background: rgba(37, 99, 235, 0.1);
          box-shadow: 0 0 0 2px #2563eb inset;
        }

        .sidebar-history-list.drag-over {
          background: rgba(0,0,0,0.02);
        }

        .sidebar-folder-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          cursor: pointer;
          border-radius: 12px;
          color: #666;
          transition: all 0.2s;
        }

        .sidebar-folder-row:hover {
          background: rgba(0,0,0,0.03);
          color: #111;
        }

        .folder-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          flex: 1;
          min-width: 0;
        }

        .folder-chevron {
          display: flex;
          align-items: center;
          width: 14px;
        }

        .folder-icon {
          color: #2563eb;
          opacity: 0.7;
        }

        .folder-name-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .folder-rename-input {
          background: white;
          border: 1px solid #2563eb;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 0.85rem;
          width: 100%;
          outline: none;
        }

        .folder-actions {
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .sidebar-folder-row:hover .folder-actions {
          opacity: 1;
        }

        .folder-action-btn {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: transparent;
          color: #999;
          cursor: pointer;
          border-radius: 4px;
        }

        .folder-action-btn:hover {
          background: rgba(0,0,0,0.05);
          color: #111;
        }

        .folder-action-btn.delete:hover {
          color: #ef4444;
        }

        .folder-content {
          margin-left: 12px;
          border-left: 1px solid rgba(0,0,0,0.05);
          padding-left: 4px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-top: 2px;
          margin-bottom: 8px;
        }

        .folder-empty {
          padding: 8px 12px;
          color: #bbb;
          font-size: 0.75rem;
          font-style: italic;
        }

        .sidebar-history-item-container.is-dragging {
          opacity: 0.4;
          transform: scale(0.98);
        }

        .sidebar-history-item-container.is-dragging * {
          pointer-events: none;
        }

        .sidebar-history-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          padding-right: 36px;
          background: transparent;
          border: none;
          color: #444;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          overflow: hidden;
          width: 100%;
        }

        .sidebar-history-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .chat-menu-wrapper {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          z-index: 5;
        }

        .chat-menu-trigger {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #111;
          cursor: pointer;
          transition: all 0.2s;
        }

        .chat-menu-trigger .more-icon-hover { display: none; }
        .chat-menu-trigger .pin-icon-visible { display: block; color: #666; opacity: 0.8; }

        .sidebar-history-item-container:hover .more-icon-hover,
        .chat-menu-trigger.active .more-icon-hover { display: block; }

        .sidebar-history-item-container:hover .pin-icon-visible,
        .chat-menu-trigger.active .pin-icon-visible { display: none; }

        .chat-menu-trigger:not(.is-pinned-state) { opacity: 0; }
        .sidebar-history-item-container:hover .chat-menu-trigger,
        .chat-menu-trigger.active { opacity: 1; }

        .chat-menu-trigger:hover { background: rgba(0,0,0,0.08); }

        .chat-dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          padding: 6px;
          min-width: 160px;
          margin-top: 4px;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 6px;
          color: #444;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .dropdown-item:hover { background: rgba(37, 99, 235, 0.05); color: #2563eb; }
        .dropdown-item.pinned { color: #2563eb; font-weight: 500; }
        .dropdown-item.delete:hover { background: #fee2e2; color: #ef4444; }

        .dropdown-divider { height: 1px; background: rgba(0,0,0,0.05); margin: 4px 6px; }

        .rename-input {
          flex: 1;
          background: white;
          border: 1px solid #2563eb;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 0.875rem;
          outline: none;
          width: 100%;
        }

        .share-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: modalFadeIn 0.2s ease-out;
        }

        .share-modal-content {
          background: white;
          width: 380px;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          position: relative;
        }

        .share-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
        .share-modal-header h3 { margin: 0; font-size: 1.25rem; color: #111; }

        .share-modal-close {
          background: #f5f5f5;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #666;
          transition: all 0.2s;
        }
        .share-modal-close:hover { background: #eee; color: #111; }

        .share-modal-subtitle { color: #666; font-size: 0.9rem; margin-bottom: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .share-options-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

        .share-option-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
          color: #444;
          font-size: 0.75rem;
          font-weight: 500;
          transition: transform 0.2s;
        }
        .share-option-btn:hover { transform: translateY(-2px); }

        .share-icon-circle {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.2s;
        }
        .share-icon-circle.copy { background: #111; }
        .share-icon-circle.mail { background: #2563eb; }
        .share-icon-circle.whatsapp { background: #22c55e; }
        .share-icon-circle.telegram { background: #0088cc; }

        .share-option-btn:hover .share-icon-circle { filter: brightness(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

        .main-content { flex: 1; height: 100vh; overflow-y: auto; position: relative; }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .spinning-loader {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(0,0,0,0.1);
          border-top: 3px solid #2563eb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default App
