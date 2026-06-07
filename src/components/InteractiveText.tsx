import React, { useState } from 'react';
import './InteractiveText.css';

interface InteractiveTextProps {
  content: string;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ content }) => {
  // Parsuje tekst w poszukiwaniu [[Termin::Definicja]]
  const parseText = (text: string) => {
    if (!text) return null;
    
    // Pattern szuka [[Cokolwiek::Cokolwiek Innego]]
    const regex = /\[\[(.*?)\]\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const inner = match[1];
      const splitIndex = inner.indexOf('::');
      
      if (splitIndex !== -1) {
        const term = inner.substring(0, splitIndex).trim();
        const definition = inner.substring(splitIndex + 2).trim();
        
        parts.push(
          <Tooltip key={match.index} term={term} definition={definition} />
        );
      } else {
        // Jeśli nie ma separatora :: to zwracamy zwykły tekst w klamrach
        parts.push(`[[${inner}]]`);
      }
      
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return <div className="interactive-text-container">{parseText(content)}</div>;
};

// Wewnętrzny subkomponent dla utrzymania logiki hovera i ARIA
const Tooltip = ({ term, definition }: { term: string, definition: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span 
      className="interactive-tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      // Na urządzenia dotykowe
      onClick={() => setIsVisible(!isVisible)}
    >
      <abbr title={definition} className="interactive-term">
        {term}
      </abbr>
      {isVisible && (
        <div className="interactive-tooltip-popup" role="tooltip">
          <div className="tooltip-carat"></div>
          <strong>{term}</strong>
          <p>{definition}</p>
        </div>
      )}
    </span>
  );
};
