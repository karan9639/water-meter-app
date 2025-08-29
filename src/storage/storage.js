import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'readings';

export async function getAllReadings() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('getAllReadings error', e);
    return [];
  }
}

export async function addReading({ treated, wasted, timestamp }) {
  const all = await getAllReadings();
  all.unshift({ id: Date.now().toString(), treated, wasted, timestamp });
  await AsyncStorage.setItem(KEY, JSON.stringify(all));
  return all;
}
