import React, { useState } from 'react';
import { Database, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SEED_NEWS } from '../lib/seed';

const SeedDatabase: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setStatus('loading');
    setMessage('Rozpoczynanie zasiedlania danych PIIB...');
    try {
      const { error } = await supabase.from('news').upsert(SEED_NEWS);
      
      if (error) {
        setStatus('error');
        setMessage(`Błąd Supabase: ${error.message} (Kod: ${error.code}). ${error.hint || 'Sprawdź czy utworzyłeś tabele w panelu SQL!'}`);
        return;
      }

      setStatus('success');
      setMessage('Baza danych została pomyślnie zasiedlona!');
    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setMessage(`Błąd techniczny: ${error.message || 'Nieznany błąd'}`);
    }
  };

  if (status === 'success') {
    return (
      <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', border: '1px solid #10b981', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#065f46' }}>
        <CheckCircle size={20} />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <Database size={24} style={{ color: '#3b82f6' }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1e293b', margin: 0 }}>Inicjalizacja Danych BimOS</h2>
      </div>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
        Kliknij poniższy przycisk, aby wypełnić swoją bazę danych Supabase przykładowymi danymi zgodnymi ze standardami PIIB (Legislacja, Dobre Praktyki, Alert CB). 
        <br/><strong>Upewnij się, że najpierw uruchomiłeś SQL w panelu Supabase!</strong>
      </p>

      <button
        onClick={handleSeed}
        disabled={status === 'loading'}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: status === 'loading' ? '#94a3b8' : '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 600,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
        }}
      >
        {status === 'loading' ? <Loader2 size={18} className="spinning-loader" /> : <Database size={18} />}
        {status === 'loading' ? 'Przetwarzanie...' : 'Zasiedl dane (Seed)'}
      </button>

      {status === 'error' && (
        <div style={{ marginTop: '1rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <AlertCircle size={16} />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
};

export default SeedDatabase;
