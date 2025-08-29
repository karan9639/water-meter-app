import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addReading } from '../../storage/storage';

function clampToNonNegative(n) {
  const v = Number.isFinite(n) ? n : 0;
  return v < 0 ? 0 : v;
}

export default function AddReadingScreen({ onAdded }) {
  const [treated, setTreated] = useState('0');
  const [wasted, setWasted] = useState('0');

  const plus = (which) => {
    if (which === 'treated') setTreated(String(clampToNonNegative(parseFloat(treated || '0') + 1)));
    else setWasted(String(clampToNonNegative(parseFloat(wasted || '0') + 1)));
  };

  const minus = (which) => {
    if (which === 'treated') setTreated(String(clampToNonNegative(parseFloat(treated || '0') - 1)));
    else setWasted(String(clampToNonNegative(parseFloat(wasted || '0') - 1)));
  };

  const submit = async () => {
    const t = parseFloat(treated);
    const w = parseFloat(wasted);
    if (isNaN(t) || isNaN(w)) {
      Alert.alert('Validation', 'Please enter numeric values.');
      return;
    }
    if (t < 0 || w < 0) {
      Alert.alert('Validation', 'Values cannot be negative.');
      return;
    }
    const now = new Date();
    const ts = now.toISOString();
    await addReading({ treated: t, wasted: w, timestamp: ts });
    setTreated('0');
    setWasted('0');
    if (onAdded) onAdded();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Treated Water Unit</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => minus('treated')}><Text style={styles.btnText}>–</Text></TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={treated}
          onChangeText={setTreated}
        />
        <TouchableOpacity style={styles.btn} onPress={() => plus('treated')}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Wasted Water Unit</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={() => minus('wasted')}><Text style={styles.btnText}>–</Text></TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={wasted}
          onChangeText={setWasted}
        />
        <TouchableOpacity style={styles.btn} onPress={() => plus('wasted')}><Text style={styles.btnText}>+</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.submit} onPress={submit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { color: 'white', marginBottom: 8, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: { backgroundColor: '#00F5A0', width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 24, fontWeight: '800' },
  input: { flex: 1, backgroundColor: '#1a1a1a', color: 'white', padding: 12, marginHorizontal: 8, borderRadius: 12, textAlign: 'center' },
  submit: { marginTop: 24, backgroundColor: '#00F5A0', padding: 14, borderRadius: 12 },
  submitText: { textAlign: 'center', fontWeight: '700' }
});
