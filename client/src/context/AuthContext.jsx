/**
 * src/context/AuthContext.jsx
 * Layer: Frontend / Context (Client State)
 * Responsibility: Lightweight global authentication state managing:
 *                 - In-memory JWT access token (never stored in localStorage)
 *                 - Current user profile state
 *                 - Silent initial session restore via HttpOnly refresh cookie on application mount
 * Interaction: Injected at root of App.jsx; consumed via useAuth() hook.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, refreshSession } from '../services/authService';
import { getCurrentUserProfile } from '../services/userService';
import { setAccessToken } from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Silent session restore on application mount
  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      try {
        const refreshData = await refreshSession();
        if (refreshData?.accessToken && isMounted) {
          const profile = await getCurrentUserProfile();
          if (isMounted) setUser(profile);
        }
      } catch (err) {
        // Unauthenticated visitor or expired session; clean state
        setAccessToken(null);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    restoreSession();

    function handleSessionExpired() {
      setUser(null);
      setAccessToken(null);
    }

    window.addEventListener('auth:session-expired', handleSessionExpired);
    return () => {
      isMounted = false;
      window.removeEventListener('auth:session-expired', handleSessionExpired);
    };
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const authData = await loginUser(credentials);
      setUser(authData.user);
      return { success: true };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const authData = await registerUser(userData);
      setUser(authData.user);
      return { success: true };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await logoutUser();
    } finally {
      setUser(null);
      setAccessToken(null);
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
