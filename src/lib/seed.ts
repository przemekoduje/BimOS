import { supabase } from './supabase';

/**
 * SQL for Supabase Editor to initialize the database:
 * 
 * -- Table: news
 * create table news (
 *   id uuid primary key default gen_random_uuid(),
 *   title text not null,
 *   category text not null,
 *   content text, 
 *   source_citation text,
 *   images text[] not null, 
 *   is_legislative boolean default false,
 *   is_new boolean default false,
 *   created_at timestamp with time zone default now()
 * );
 * 
 * -- Table: chat_history
 * create table chat_history (
 *   id uuid primary key default gen_random_uuid(),
 *   user_id uuid references auth.users not null,
 *   project_id text,
 *   location_tag text,
 *   role text not null check (role in ('user', 'assistant')),
 *   content text not null,
 *   created_at timestamp with time zone default now()
 * );
 */

export const SEED_NEWS = [
  // FEATURED HERO CARDS
  {
    title: 'Analiza przepisów i WT',
    category: 'Interpretacja warunków technicznych i obostrzeń ppoż.',
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200'
    ],
    is_legislative: false,
    source_citation: 'Rozporządzenie Ministra Infrastruktury ws. warunków technicznych'
  },
  {
    title: 'Procedury w elektronicznym KOB',
    category: 'Przewodnik dodawania wpisów, przeglądów i załączników.',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1541888941259-792739460a3b?auto=format&fit=crop&q=80&w=200'
    ],
    is_legislative: false,
    source_citation: 'Art. 60b Prawa Budowlanego'
  },
  // PIIB-COMPLIANT LEGISLATIVE TICKER
  {
    title: 'Nowelizacja Art. 62 Prawa Budowlanego - Obowiązki zarządcy',
    category: 'Legislacja Budowlana',
    images: [],
    is_legislative: true,
    is_new: true,
    source_citation: 'Dz.U. 2024 poz. 123',
    content: 'Zmiana terminów kontroli okresowych obiektów wielkopowierzchniowych.'
  },
  {
    title: 'Wzorcowy wpis do Dziennika Budowy (Standard PIIB)',
    category: 'Dobre Praktyki',
    images: [],
    is_legislative: true,
    is_new: false,
    source_citation: 'Wytyczne PIIB dla Kierowników Budów',
    content: 'Szablon poprawnego wpisu dotyczącego odbioru robót zanikających i ulegających zakryciu.'
  },
  {
    title: 'Alert Bezpieczeństwa: Nowe normy ppoż. dla elewacji',
    category: 'Bezpieczeństwo Pożarowe',
    images: [],
    is_legislative: true,
    is_new: true,
    source_citation: 'Komunikat KG PSP 05/2024',
    content: 'Wymagana aktualizacja certyfikatów ITB dla systemów ociepleń powyżej 25m.'
  }
];

export const seedDatabase = async () => {
  console.log('Rozpoczynanie zasiedlania bazy danych...');
  
  const { error: newsError } = await supabase
    .from('news')
    .upsert(SEED_NEWS);

  if (newsError) {
    console.error('Błąd podczas zasiedlania tabeli news:', newsError);
  } else {
    console.log('Tabela news została pomyślnie zasiedlona.');
  }
};
