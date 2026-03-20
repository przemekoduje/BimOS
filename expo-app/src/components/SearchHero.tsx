import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Search, Send, Globe, Clock, ChevronRight } from 'lucide-react-native';

const SearchHero: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>Construction AI Assistant</Text>
        <Text style={styles.subtitle}>Baza wiedzy i nadzór cyfrowy w Twoim zasięgu.</Text>
        
        <View style={styles.searchWrapper}>
          <View style={styles.searchBar}>
            <Search stroke="#64748b" size={20} style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Zadaj pytanie techniczne lub wyszukaj..."
              placeholderTextColor="#94a3b8"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity style={styles.sendButton}>
              <Send stroke="#fff" size={18} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchFooter}>
            <View style={styles.footerItem}>
              <Globe stroke="#94a3b8" size={12} />
              <Text style={styles.footerText}>Aktualizacja: GUNB, Sejm (RCL)</Text>
            </View>
            <View style={styles.footerItem}>
              <Clock stroke="#94a3b8" size={12} />
              <Text style={styles.footerText}>Dane e-CRUB: 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Wyszukaj inżyniera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Prawo budowlane 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pill}>
            <Text style={styles.pillText}>Analiza wąskich gardeł</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Najpopularniejsze tematy dzisiaj</Text>
          {[
            'Jakie są wymogi dla dziennika budowy 2024?',
            'Zmiany w WT2021 dla budynków biurowych',
            'Odpowiedzialność kierownika budowy w świetle nowelizacji'
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.topicCard}>
              <Text style={styles.topicText}>{item}</Text>
              <ChevronRight stroke="#CBD5E1" size={16} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 40,
  },
  heroSection: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  searchWrapper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 4,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
      },
      android: {
        elevation: 10,
      },
      web: {
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    }),
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 56,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    height: '100%',
  },
  sendButton: {
    backgroundColor: '#2563eb',
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  searchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 24,
    justifyContent: 'center',
  },
  pill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  pillText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  featuredSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  topicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 12,
  },
  topicText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
    marginRight: 12,
    lineHeight: 20,
  },
});

export default SearchHero;
