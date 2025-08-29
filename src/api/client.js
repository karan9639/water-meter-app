import Constants from 'expo-constants';

const { apiBaseUrl, apiPrefix } = Constants?.expoConfig?.extra ?? {};
const BASE = apiBaseUrl || 'https://metre-reading.onrender.com';
const PREFIX = apiPrefix || 'api/v1';

const buildUrl = (endpoint) => {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${BASE}/${PREFIX}${clean}`;
};

async function getStoredUser() {
  try {
    const { default: AsyncStorage } = await import('@react-native-async-storage/async-storage');
    const raw = await AsyncStorage.getItem('water_app_user');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export async function apiRequest(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const user = await getStoredUser();
  const url = buildUrl(endpoint);

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // mimic webapp header strategy (backend may accept email auth)
      ...(user?.email ? { Authorization: `Bearer ${user.email}` } : {}),
      ...(user?.email ? { 'X-User-Email': user.email } : {}),
      ...headers,
    },
    // NOTE: RN fetch doesn't support `credentials: "include"` like web;
    // server should rely on headers above.
  };

  if (body !== undefined) {
    config.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const resp = await fetch(url, config);
  const text = await resp.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

  if (!resp.ok) {
    const message = data?.message || `HTTP ${resp.status}`;
    const err = new Error(message);
    err.status = resp.status;
    err.data = data;
    throw err;
  }
  return data;
}
