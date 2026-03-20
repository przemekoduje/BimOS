import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Search, Filter, Mail, Phone, MapPin, UserCheck } from 'lucide-react-native';
import { fetchEngineers, Engineer } from '../services/engineerService';

const AdminPanel: React.FC = () => {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [filtered, setFiltered] = useState<Engineer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchEngineers();
        setEngineers(data);
        setFiltered(data.slice(0, 100)); // Initial 100 for perf
      } catch (error) {
        console.error("Failed to load engineers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(engineers.slice(0, 100));
      return;
    }

    const filteredData = engineers.filter(e => 
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      e.licenseNumber.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData.slice(0, 100));
  }, [search, engineers]);

  const renderItem = ({ item }: { item: Engineer }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
        <Text style={styles.speciality}>{item.speciality}</Text>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <UserCheck size={14} stroke="#64748b" />
          <Text style={styles.infoText}>{item.licenseNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={14} stroke="#64748b" />
          <Text style={styles.infoText}>{item.city}, {item.province}</Text>
        </View>
        
        <View style={styles.contactSection}>
          {item.email && (
            <View style={styles.contactBadge}>
              <Mail size={12} stroke="#2563eb" />
              <Text style={styles.contactText}>{item.email}</Text>
            </View>
          )}
          {item.phone && (
            <View style={[styles.contactBadge, styles.phoneBadge]}>
              <Phone size={12} stroke="#10b981" />
              <Text style={styles.contactText}>{item.phone}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Search size={20} stroke="#94a3b8" />
          <TextInput 
            style={styles.input}
            placeholder="Szukaj po nazwisku lub numerze..."
            placeholderTextColor="#94a3b8"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={20} stroke="#334155" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nie znaleziono inżynierów</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    fontSize: 14,
    color: '#1e293b',
  },
  filterBtn: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  speciality: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#64748b',
  },
  contactSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  contactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  phoneBadge: {
    backgroundColor: '#ecfdf5',
  },
  contactText: {
    fontSize: 11,
    color: '#1e293b',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#94a3b8',
    fontSize: 16,
  }
});

export default AdminPanel;
