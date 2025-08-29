import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { fetchReadingsApi } from '../../api/readings';

function formatTS(ts) {
  const d = new Date(ts);
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  return { date, time };
}

export default function ReadingsScreen() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      const items = await fetchReadingsApi();
      // Normalize to the shape used by renderer
      const normalized = items.map((it, idx) => ({
        id: String(it._id || it.id || idx),
        treated: it.treatedWaterReading ?? it.treated ?? 0,
        wasted: it.wastedWaterReading ?? it.wasted ?? 0,
        timestamp: it.createdAt || it.timestamp || Date.now(),
      }));
      setData(normalized);
    } catch (e) {
      // Optionally show an error row
      setData([]);
    }
  };

  useEffect(() => { load(); }, []);

  const renderItem = ({ item }) => {
    const { date, time } = formatTS(item.timestamp);
    return (
      <View style={styles.card}>
        <Text style={styles.row}><Text style={styles.label}>Treated:</Text> {item.treated}</Text>
        <Text style={styles.row}><Text style={styles.label}>Wasted:</Text> {item.wasted}</Text>
        <Text style={styles.row}><Text style={styles.label}>Recorded Date:</Text> {date}</Text>
        <Text style={styles.row}><Text style={styles.label}>Recorded Time:</Text> {time}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={<Text style={{ color: 'white', textAlign: 'center', marginTop: 32 }}>No readings yet</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#131313', borderRadius: 12, padding: 12 },
  row: { color: 'white', marginBottom: 4 },
  label: { fontWeight: '700', color: '#00F5A0' }
});
