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
      
      // Delikatna korekta by nie wychodziło poza krawędzie w miniaturowych oknach
      let leftOffset = rect.left + rect.width / 2;
      const maxVW = window.innerWidth;
      if (leftOffset + 200 > maxVW) leftOffset = maxVW - 210;
      if (leftOffset - 200 < 0) leftOffset = 210;

      setPos({
        top: rect.top,
        left: leftOffset,
      });
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
        <div 
          className="tech-tooltip-portal-box"
          style={{ top: pos.top, left: pos.left }}
        >
          {title}
        </div>,
        document.body
      )}
    </>
  );
};

const SearchHero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    if (isLoading) {
      // Zjeżdżaj na dół, żeby zobaczyć animację ładowania
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (chatHistory.length > 0) {
      const lastIdx = chatHistory.length - 1;
      // Kiedy skończy ładować się odpowiedź AI, podjedź do jej szczytu
      if (chatHistory[lastIdx].role === 'ai') {
        const el = document.getElementById(`msg-${lastIdx}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chatHistory.length, isLoading]);

  const handleSend = async (text?: string) => {
    const textToSend = text || query;
    if (!textToSend.trim()) return;

    const newUserMsg: ChatMessage = { role: 'user', content: textToSend };
    const newHistory = [...chatHistory, newUserMsg];
    
    setChatHistory(newHistory);
    setQuery('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
    }
    setIsLoading(true);

    try {
      const reply = await askKnowledgeBase(newHistory, textToSend);
      setChatHistory([...newHistory, { role: 'ai', content: reply }]);
    } catch (e) {
      console.error(e);
      setChatHistory([...newHistory, { role: 'ai', content: "Przepraszam, wystąpił błąd w przetwarzaniu zapytania. Spróbuj ponownie." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(undefined);
    }
  };

  if (selectedNewsId) {
    return <NewsDetail id={selectedNewsId} onBack={() => setSelectedNewsId(null)} />;
  }

  const isChatActive = chatHistory.length > 0;

  // Funkcja czyszcząca i wyciągająca dopytania
  const parseMessageContent = (content: string) => {
    // 1. Zabezpieczenie przed błędnym syntaxem Markdown generowanym przez AI
    // Jeśli AI wygeneruje [Tekst](#tooltip:Ze spacjami), standardowy parser to zepsuje.
    // Zamieniamy to automatycznie w locie natywny standard: [Tekst](# "Ze spacjami")
    let safeContent = content.replace(/\[([^\]]+)\]\(#tooltip:([^)]+)\)/g, '[$1](# "$2")');
    // Dla pewności wyłapujemy też najstarszy błąd AI
    safeContent = safeContent.replace(/\[([^\]]+)\]\(tooltip:([^)]+)\)/g, '[$1](# "$2")');

    const dopytaniaMarker = '[DOPYTANIA_START]';
    const markerIndex = safeContent.indexOf(dopytaniaMarker);
    
    if (markerIndex !== -1) {
      const mainText = safeContent.substring(0, markerIndex).trim();
      const rawQuestions = safeContent.substring(markerIndex + dopytaniaMarker.length).trim();
      const suggestions = rawQuestions
        .split('\n')
        .map(q => q
          .replace(/^[-\*\d\.]+\s*/, '') // Usuń myślniki, kropki, liczby z początku
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Usuń markdown linki np z tooltipów
          .trim()
        ) 
        .filter(q => q.length > 0);
      return { mainText, suggestions };
    }
    
    return { mainText: content, suggestions: [] };
  };

  return (
    <div className={`hero-container ${isChatActive ? 'chat-mode' : ''}`}>
      <div className="hero-content">
        {!isChatActive && <h1 className="hero-title">BimOS. Twoja inżynieria.</h1>}
        
        {isChatActive && (
          <div className="chat-history-container">
            {chatHistory.map((msg, idx) => {
              const { mainText, suggestions } = parseMessageContent(msg.content);
              return (
                <div key={idx} id={`msg-${idx}`} className={`chat-bubble-row ${msg.role}`}>
                  <div className="chat-bubble">
                    {msg.role === 'ai' ? (
                      <>
                        <div className="markdown-content">
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              h2: ({node, ...props}) => <h2 className="markdown-h2" {...props} />,
                              h3: ({node, ...props}) => <h3 className="markdown-h3" {...props} />,
                              strong: ({node, ...props}) => <strong className="markdown-strong" {...props} />,
                              ul: ({node, ...props}) => <ul className="markdown-ul" {...props} />,
                              li: ({node, ...props}) => <li className="markdown-li" {...props} />,
                              a: ({node, href, title, children, ...props}) => {
                                if (href === '#' && title) {
                                  return (
                                    <TooltipLink title={title}>{children}</TooltipLink>
                                  );
                                }
                                return <a href={href} title={title} className="markdown-link" {...props}>{children}</a>;
                              },
                            }}
                          >
                            {mainText}
                          </ReactMarkdown>
                        </div>
                        {suggestions.length > 0 && idx === chatHistory.length - 1 && !isLoading && (
                          <div className="suggestions-container">
                            <div className="suggestions-divider">Dopytania uściślające</div>
                            <div className="suggestions-chips">
                              {suggestions.map((suggestion, sIdx) => (
                                <button 
                                  key={sIdx} 
                                  className="suggestion-chip"
                                  onClick={() => handleSend(suggestion)}
                                >
                                  <Zap size={14} className="chip-icon" />
                                  <span>{suggestion}</span>
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
                  <Loader2 className="spinning-loader" size={20} /> Myślę...
                </div>
              </div>
            )}
            <div ref={chatBottomRef} style={{ height: 1 }} />
          </div>
        )}
        
        <div className="search-wrapper">
          <div className="search-bar">
            <textarea 
              ref={textareaRef}
              className="search-input" 
              placeholder="Odpowiedź jest tam, gdzie Ty."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <div className="search-actions-row">
              <div className="search-left-actions">
                <button className="search-action-btn">
                  <Plus size={20} />
                </button>
              </div>
              <div className="search-right-actions">
                <button className="search-action-btn">
                  <Mic size={20} />
                </button>
                <button 
                  className="send-button"
                  onClick={() => handleSend(undefined)}
                  disabled={isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="search-footer">
            <div className="footer-item">
              <Globe size={14} />
              <span>Baza Wiedzy: cKOB (v.1.0)</span>
            </div>
            <div className="footer-item">
              <Clock size={14} />
              <span>Aktualizacja: 2024</span>
            </div>
          </div>
        </div>

        {!isChatActive && (
          <>
            <div className="quick-links">
              <button className="pill" onClick={() => handleSend("Kto ma obowiązek założyć wpis do cKOB?")}>Kto zakłada cKOB?</button>
              <button className="pill" onClick={() => handleSend("Jakie są kary za brak założonej książki obiektu?")}>Kary za brak wpisu</button>
              <button className="pill" onClick={() => handleSend("Do kiedy mam czas na przejście na cKOB?")}>Terminy cyfryzacji</button>
              <button className="pill" onClick={() => handleSend("Podsumuj w 3 zdaniach czym na prawdę jest nowa platforma.")}>O platformie e-Budownictwo</button>
            </div>

            <QuickNewsList onItemClick={(text) => handleSend(text)} />

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
