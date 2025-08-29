import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAllReadings } from '../../storage/storage';

function formatTS(ts) {
  const d = new Date(ts);
  const date = d.toLocaleDateString();
  const time = d.toLocaleTimeString();
  return { date, time };
}

export default function ReadingsScreen() {
  const [data, setData] = useState([]);

  const load = async () => {
    const items = await getAllReadings();
    setData(items);
  };

  useEffect(() => {
    const focusLoad = load;
    focusLoad();
  }, []);

  const renderItem = ({ item }) => {
    const { date, time } = formatTS(item.timestamp);
    return (
      <View style={styles.card}>
        <Text style={styles.row}><Text style={styles.label}>Treated:</Text> {item.treated}</Text>
        <Text style={styles.row}><Text style={styles.label}>Wasted:</Text> {item.wasted}</Text>
        <Text style={styles.row}><Text style={styles.label}>Date:</Text> {date}</Text>
        <Text style={styles.row}><Text style={styles.label}>Time:</Text> {time}</Text>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#131313', borderRadius: 12, padding: 12 },
  row: { color: 'white', marginBottom: 4 },
  label: { fontWeight: '700', color: '#00F5A0' }
});
