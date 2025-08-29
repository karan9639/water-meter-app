import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, logoutUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Keep backwards compatibility with previous key
        const t = (await AsyncStorage.getItem('water_app_auth_token')) || (await AsyncStorage.getItem('auth_token'));
        if (t) setToken(t);
      } catch (e) {
        console.warn('Failed to load token', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async ({ email, password }) => {
    const res = await loginUser({ email, password });
    const t = (await AsyncStorage.getItem('water_app_auth_token')) || (await AsyncStorage.getItem('auth_token'));
    if (t) setToken(t);
    return res;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
