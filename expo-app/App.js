import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import InspectionModule from './src/components/InspectionModule';

// Placeholder components for migrated Hero and Admin
const SearchHero = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Wyszukiwarka Inżynierów (Wersja Mobilna)</Text>
    <Text style={styles.placeholderSub}>Tutaj pojawi się wyszukiwarka zoptymalizowana pod telefon.</Text>
  </View>
);

const AdminPanel = () => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>Panel Administratora</Text>
    <Text style={styles.placeholderSub}>Zarządzanie bazą z poziomu aplikacji.</Text>
  </View>
);

export default function App() {
  const [view, setView] = useState<'search' | 'admin' | 'inspections'>('search');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => setView('search')}>
          <Text style={styles.logo}>BimOS</Text>
        </TouchableOpacity>
        <View style={styles.navLinks}>
          <TouchableOpacity onPress={() => setView('inspections')}>
            <Text style={[styles.navLink, view === 'inspections' && styles.activeLink]}>Przeglądy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setView('admin')}>
            <Text style={[styles.navLink, view === 'admin' && styles.activeLink]}>Admin</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.main}>
        {view === 'search' && <SearchHero />}
        {view === 'admin' && <AdminPanel />}
        {view === 'inspections' && <InspectionModule />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  logo: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  navLink: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  activeLink: {
    color: '#2563eb',
    fontWeight: '700',
  },
  main: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholderSub: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
});
