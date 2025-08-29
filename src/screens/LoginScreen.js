import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setError('');
    try {
      if (!email.trim() || !password.trim()) {
        setError('Email and password are required.');
        return;
      }
      setBusy(true);
      await login({ email: email.trim(), password: password.trim() });
    } catch (e) {
      setError(e?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!busy}
      />

      <View style={[styles.row, { marginBottom: 12 }]}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!show}
          value={password}
          onChangeText={setPassword}
          editable={!busy}
        />
        <TouchableOpacity onPress={() => setShow(!show)} style={styles.eye} disabled={busy}>
          <Text style={{ color: 'white' }}>{show ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} onPress={onSubmit} disabled={busy}>
        <Text style={styles.btnText}>{busy ? 'Signing in...' : 'Login'}</Text>
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
