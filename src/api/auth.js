import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from './client';

const AUTH_TOKEN_KEY = 'water_app_auth_token';
const USER_DATA_KEY = 'water_app_user';

export async function loginUser({ email, password }) {
  const res = await apiRequest('/user/login', {
    method: 'POST',
    body: { email, password },
  });

  // If API returns a token, store it; else fallback to a pseudo token (same as web)
  const token = res?.data?.token || res?.token || btoa(JSON.stringify({ email, ts: Date.now() }));

  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify({ email }));
  return res;
}

export async function logoutUser() {
  try {
    await apiRequest('/user/logout', { method: 'POST' });
  } catch (e) {
    // ignore network errors on logout
  } finally {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
    await AsyncStorage.removeItem('auth_token'); // legacy key used earlier in app
  }
}

export async function getStoredToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
}

export async function getStoredUser() {
  const raw = await AsyncStorage.getItem(USER_DATA_KEY);
  return raw ? JSON.parse(raw) : null;
}
