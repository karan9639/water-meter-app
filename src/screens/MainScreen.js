import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AddReadingScreen from './tabs/AddReadingScreen';
import ReadingsScreen from './tabs/ReadingsScreen';

export default function MainScreen() {
  const { logout } = useAuth();
  const [tab, setTab] = useState('add');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reading Tracker</Text>
        <TouchableOpacity style={styles.logout} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, tab === 'add' && styles.activeTab]} onPress={() => setTab('add')}>
          <Text style={styles.tabText}>Add Reading</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'list' && styles.activeTab]} onPress={() => setTab('list')}>
          <Text style={styles.tabText}>Readings</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {tab === 'add' ? <AddReadingScreen onAdded={() => setTab('list')} /> : <ReadingsScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b' },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { color: 'white', fontSize: 20, fontWeight: '700' },
  logout: { backgroundColor: '#222', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  logoutText: { color: '#fff' },
  tabs: { flexDirection: 'row', margin: 12, padding: 4, backgroundColor: '#121212', borderRadius: 12 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#1d1d1d' },
  tabText: { color: 'white', fontWeight: '600' }
});
