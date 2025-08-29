import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setError('');
    try {
      if (!email.trim() || !password.trim()) {
        setError('Email and password are required.');
        return;
      }
      await login(email.trim(), password.trim());
    } catch (e) {
      setError(e.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reading Tracker</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.row}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={[styles.input, { flex: 1 }]}
          secureTextEntry={!show}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShow(s => !s)} style={styles.eye}>
          <Text>{show ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#0b0b0b' },
  title: { color: 'white', fontSize: 24, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  input: { backgroundColor: '#1a1a1a', color: 'white', padding: 12, borderRadius: 10, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  eye: { marginLeft: 8, padding: 10, backgroundColor: '#1a1a1a', borderRadius: 10 },
  btn: { backgroundColor: '#00F5A0', padding: 14, borderRadius: 12, marginTop: 8 },
  btnText: { textAlign: 'center', fontWeight: '700' },
  error: { color: '#ff6b6b', marginBottom: 8 }
});
