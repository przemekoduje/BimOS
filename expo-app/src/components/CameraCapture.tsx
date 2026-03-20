import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

interface Captures {
  id: string;
  type: 'video' | 'image';
  url: string;
  notes: string;
}

interface CameraCaptureProps {
  onBack: () => void;
  onFinish: (captures: Captures[]) => void;
}

export default function CameraCapture({ onBack, onFinish }: CameraCaptureProps) {
  const [captures, setCaptures] = useState<Captures[]>([]);

  const handleCapture = async () => {
    // Ask for permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Błąd', 'Potrzebujemy dostępu do aparatu, aby wykonać oględziny.');
      return;
    }

    // Launch camera for both images and video
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images', 'videos'],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setCaptures(prev => [
        ...prev, 
        { 
          id: Date.now().toString(), 
          type: asset.type === 'video' ? 'video' : 'image', 
          url: asset.uri, 
          notes: '' 
        }
      ]);
    }
  };

  const updateNotes = (id: string, notes: string) => {
    setCaptures(prev => prev.map(c => c.id === id ? { ...c, notes } : c));
  };

  const removeCapture = (id: string) => {
    setCaptures(prev => prev.filter(c => c.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Wróć</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Oględziny Terenowe</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{captures.length}</Text>
        </View>
        </View>

      <View style={styles.actionArea}>
        <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
          <Text style={styles.captureBtnIcon}>📸</Text>
          <Text style={styles.captureBtnText}>Nagraj / Zrób Zdjęcie</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {captures.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Naciśnij aparat by uruchomić skaner telefonu i uwiecznić usterki. Pamiętaj, aby opisywać je również głosem!
            </Text>
          </View>
        ) : (
          captures.map(capture => (
            <View key={capture.id} style={styles.captureCard}>
              <View style={styles.mediaPreview}>
                {capture.type === 'video' ? (
                  <Video
                    source={{ uri: capture.url }}
                    style={styles.media}
                    useNativeControls
                    resizeMode="cover"
                  />
                ) : (
                  <Image source={{ uri: capture.url }} style={styles.media} />
                )}
              </View>
              <View style={styles.details}>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Zanotuj spostrzeżenia lub pozostaw pole puste – AI wygeneruje opis na podstawie wideo i głosu."
                  placeholderTextColor="#94a3b8"
                  multiline
                  value={capture.notes}
                  onChangeText={(text) => updateNotes(capture.id, text)}
                />
                <TouchableOpacity style={styles.deleteBtn} onPress={() => removeCapture(capture.id)}>
                  <Text style={styles.deleteBtnText}>Usuń</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {captures.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.finishBtn} onPress={() => onFinish(captures)}>
            <Text style={styles.finishBtnText}>Generuj Protokół AI 🪄</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backBtn: {
    padding: 4,
  },
  backBtnText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  badge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  actionArea: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  captureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    gap: 12,
    elevation: 4,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  captureBtnIcon: {
    fontSize: 24,
  },
  captureBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  emptyState: {
    padding: 40,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#94a3b8',
    lineHeight: 20,
    fontSize: 14,
  },
  captureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    gap: 16,
  },
  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#0f172a',
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    justifyContent: 'space-between',
  },
  notesInput: {
    fontSize: 13,
    color: '#1e293b',
    backgroundColor: '#f8fafc',
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 60,
    textAlignVertical: 'top',
  },
  deleteBtn: {
    alignSelf: 'flex-end',
    backgroundColor: '#fee2e2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  deleteBtnText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  finishBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  finishBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
