import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CameraCapture from './CameraCapture';

export default function InspectionModule() {
  const [activeTab, setActiveTab] = useState<'list' | 'new' | 'camera'>('list');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Przeglądy Budowlane (AI)</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'list' && styles.activeTab]} 
            onPress={() => setActiveTab('list')}
          >
            <Text style={[styles.tabText, activeTab === 'list' && styles.activeTabText]}>Moje Przeglądy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, styles.primaryBtn, activeTab === 'new' && styles.activePrimaryTab]} 
            onPress={() => setActiveTab('new')}
          >
            <Text style={[styles.tabText, (activeTab === 'new' || activeTab === 'camera') && styles.activePrimaryTabText]}>+ Nowy Przegląd</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {activeTab === 'list' && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Brak aktywnych przeglądów</Text>
            <Text style={styles.emptyDesc}>Kliknij "Nowy Przegląd", aby zaimportować archiwalny PDF i rozpocząć oględziny.</Text>
          </View>
        )}

        {activeTab === 'new' && (
          <View style={styles.wizardCard}>
            <Text style={styles.wizardTitle}>Krok 1: Wgraj archiwalny protokół (PDF)</Text>
            <Text style={styles.wizardDesc}>
              System AI odczyta z archiwalnego dokumentu wszystkie punkty kontrolne (np. dach, rynny, instalacje), aby upewnić się, że nie pominiesz żadnego z nich podczas dzisiejszych oględzin na obiekcie.
            </Text>
            
            <TouchableOpacity style={styles.uploadArea} onPress={() => Alert.alert('Wkrótce', 'Integracja z DocumentPicker zostanie dodana!')}>
              <Text style={styles.uploadBtnText}>Wybierz plik PDF</Text>
              <Text style={styles.uploadHint}>Lub wybierz plik z zeszłego roku z pamięci telefonu.</Text>
            </TouchableOpacity>

            <View style={styles.wizardActions}>
              <TouchableOpacity style={styles.startBtn} onPress={() => setActiveTab('camera')}>
                <Text style={styles.startBtnText}>Przejdź do oględzin (Aparat) 📸</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'camera' && (
          <CameraCapture 
            onBack={() => setActiveTab('new')} 
            onFinish={(captures: any) => {
              console.log("Zebrane materiały: ", captures);
              Alert.alert('Sukces', `Oględziny zakończone! Przekazano ${captures.length} plików do silnika AI.`);
              setActiveTab('list');
            }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#e0f2fe',
    borderColor: '#7dd3fc',
  },
  tabText: {
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#0284c7',
  },
  primaryBtn: {
    backgroundColor: '#fff',
  },
  activePrimaryTab: {
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
  },
  activePrimaryTabText: {
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  emptyState: {
    padding: 60,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyDesc: {
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 22,
  },
  wizardCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wizardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  wizardDesc: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadArea: {
    padding: 40,
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#94a3b8',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  uploadBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  uploadHint: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
  wizardActions: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  startBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
