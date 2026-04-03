import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Send, Clock, Globe, Plus, Mic, Loader2, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askKnowledgeBase, type ChatMessage } from '../services/aiService';
import NewsGrid from './NewsGrid';
import QuickNewsList from './QuickNewsList';
import NewsDetail from './NewsDetail';
import './SearchHero.css';

// --- COMPONENTS ---

const TooltipLink = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (show) {
      const handleScroll = () => setShow(false);
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [show]);

  const handleMouseEnter = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      let leftOffset = rect.left + rect.width / 2;
      const maxVW = window.innerWidth;
      if (leftOffset + 200 > maxVW) leftOffset = maxVW - 210;
      if (leftOffset - 200 < 0) leftOffset = 210;

      setPos({ top: rect.top, left: leftOffset });
      setShow(true);
    }
  };

  return (
    <>
      <span
        ref={spanRef}
        className="tech-tooltip-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShow(false)}
      >
        <span className="tech-term">{children}</span>
      </span>
      {show && createPortal(
        <div className="tech-tooltip-portal-box" style={{ top: pos.top, left: pos.left }}>
          {title}
        </div>,
        document.body
      )}
    </>
  );
};

/**
 * Animowany tekst odpowiedzi (Premium Reveal) z obs┼éug─ů dymk├│w w ka┼╝dym elemencie Markdown
 */
const AnimatedResponse: React.FC<{ content: string; isLast: boolean }> = ({ content, isLast }) => {
  const [displayedText, setDisplayedText] = useState(isLast ? "" : content);
  
  useEffect(() => {
    if (!isLast) {
      setDisplayedText(content);
      return;
    }
    
    const words = content.split(' ');
    let currentIdx = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (currentIdx >= words.length) {
        clearInterval(interval);
        return;
      }
      const nextWord = words[currentIdx];
      setDisplayedText(prev => (prev ? prev + " " + nextWord : nextWord));
      currentIdx++;
    }, 25);

    return () => clearInterval(interval);
  }, [content, isLast]);

  const parseWithTooltips = (text: string) => {
    const parts = [];
    let lastIndex = 0;
    const tagRegex = /\[\[(.*?)::(.*?)\]\]/g;
    let match;

    while ((match = tagRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      const term = match[1];
      const definition = match[2];
      parts.push(<TooltipLink key={match.index} title={definition}>{term}</TooltipLink>);
      lastIndex = tagRegex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts;
  };

  const renderWithTooltips = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, child => {
      if (typeof child === 'string') return parseWithTooltips(child);
      if (React.isValidElement(child) && child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: renderWithTooltips(child.props.children)
        });
      }
      return child;
    });
  };

  const dopytaniaIdx = displayedText.indexOf('[DOPYTANIA_START]');
  const mainText = dopytaniaIdx !== -1 ? displayedText.substring(0, dopytaniaIdx).trim() : displayedText;

  return (
    <div className="markdown-content reveal-animation">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({children}) => <h2 className="markdown-h2">{renderWithTooltips(children)}</h2>,
          h3: ({children}) => <h3 className="markdown-h3">{renderWithTooltips(children)}</h3>,
          strong: ({children}) => <strong className="markdown-strong">{renderWithTooltips(children)}</strong>,
          ul: ({children}) => <ul className="markdown-ul">{children}</ul>,
          li: ({children}) => <li className="markdown-li">{renderWithTooltips(children)}</li>,
          p: ({children}) => <p className="markdown-p">{renderWithTooltips(children)}</p>
        }}
      >
        {mainText}
      </ReactMarkdown>
    </div>
  );
};

// --- MAIN COMPONENT ---

const SearchHero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatusText, setLoadingStatusText] = useState("");
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 250)}px`;
    }
  }, [query]);

  useEffect(() => {
    if (isLoading || chatHistory.length > 0) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading, loadingStatusText, chatHistory.length]);

  const handleSearch = async (overrideQuery?: string) => {
    const finalQuery = overrideQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: finalQuery };
    setChatHistory(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    setLoadingStatusText("Pobieranie kontekstu...");

    try {
      const response = await askKnowledgeBase([...chatHistory, userMessage], finalQuery, (status) => {
        setLoadingStatusText(status);
      });
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
    } catch (error) {
      console.error("Search Error:", error);
      setChatHistory(prev => [...prev, { role: 'ai', content: "Przepraszam, b┼é─ůd systemu. Spr├│buj za chwil─Ö." }]);
    } finally {
      setIsLoading(false);
      setLoadingStatusText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const extractQuestions = (content: string) => {
    const dopytaniaIdx = content.indexOf('[DOPYTANIA_START]');
    if (dopytaniaIdx === -1) return [];
    const questionsPart = content.substring(dopytaniaIdx + '[DOPYTANIA_START]'.length).trim();
    return questionsPart.split('\n')
      .map(q => q
        .replace(/^[-*ÔÇó\d\.]+\s*/, '') // Czy┼Ť─ç punktory
        .replace(/\[\[(.*?)::.*?\]\]/g, '$1') // Usu┼ä tagi dymk├│w, zostaw sam termin
        .trim()
      )
      .filter(q => q.length > 5)
      .slice(0, 3);
  };

  if (selectedNewsId) {
    return <NewsDetail id={selectedNewsId} onBack={() => setSelectedNewsId(null)} />;
  }

  const isChatActive = chatHistory.length > 0;

  return (
    <div className={`hero-container ${isChatActive ? 'chat-mode' : ''}`}>
      <div className="hero-content">
        {!isChatActive && <h1 className="hero-title">BimOS. Twoja in┼╝ynieria.</h1>}
        
        {isChatActive && (
          <div className="chat-history-container">
            {chatHistory.map((msg, idx) => {
              const lastAiMessage = msg.role === 'ai' && idx === chatHistory.length - 1;
              const questions = msg.role === 'ai' ? extractQuestions(msg.content) : [];
              
              return (
                <div key={idx} id={`msg-${idx}`} className={`chat-bubble-row ${msg.role}`}>
                  <div className="chat-bubble">
                    {msg.role === 'ai' ? (
                      <>
                        <AnimatedResponse content={msg.content} isLast={lastAiMessage} />
                        {questions.length > 0 && lastAiMessage && !isLoading && (
                          <div className="suggestions-container">
                            <div className="suggestions-divider">Dopytania u┼Ťci┼Ťlaj─ůce</div>
                            <div className="suggestions-chips">
                              {questions.map((q, sIdx) => (
                                <button key={sIdx} className="suggestion-chip" onClick={() => handleSearch(q)}>
                                  <Zap size={14} className="chip-icon" />
                                  <span>{q}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="user-text">{msg.content}</span>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="chat-bubble-row ai">
                <div className="chat-bubble loading">
                  <Loader2 className="spinning-loader" size={20} /> 
                  <span className="loading-text-stage">{loadingStatusText || "Inicjowanie..."}</span>
                </div>
              </div>
            )}
            <div ref={chatBottomRef} style={{ height: 20 }} />
          </div>
        )}
        
        <div className="search-wrapper">
          <div className="search-bar">
            <textarea 
              ref={textareaRef}
              className="search-input" 
              placeholder="Odpowied┼║ jest tam, gdzie Ty."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div className="search-actions-row">
              <div className="search-left-actions">
                <button className="search-action-btn"><Plus size={20} /></button>
              </div>
              <div className="search-right-actions">
                <button className="search-action-btn"><Mic size={20} /></button>
                <button className="send-button" onClick={() => handleSearch()} disabled={isLoading}>
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="search-footer">
            <div className="footer-item">
              <Globe size={14} /> <span>Baza Wiedzy: cKOB (v.1.0)</span>
            </div>
            <div className="footer-item">
              <Clock size={14} /> <span>Aktualizacja: 2024</span>
            </div>
          </div>
        </div>

        {!isChatActive && (
          <>
            <div className="quick-links">
              <button className="pill" onClick={() => handleSearch("Kto ma obowi─ůzek za┼éo┼╝y─ç wpis do cKOB?")}>Kto zak┼éada cKOB?</button>
              <button className="pill" onClick={() => handleSearch("Jakie s─ů kary za brak za┼éo┼╝onej ksi─ů┼╝ki obiektu?")}>Kary za brak wpisu</button>
              <button className="pill" onClick={() => handleSearch("Do kiedy mam czas na przej┼Ťcie na cKOB?")}>Terminy cyfryzacji</button>
            </div>
            <QuickNewsList onItemClick={(text) => handleSearch(text)} />
            <section className="dashboard-news-section">
              <NewsGrid onCardClick={(id) => setSelectedNewsId(id)} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchHero;
