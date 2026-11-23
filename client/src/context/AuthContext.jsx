import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEMO_USER } from '../data/mockUser';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('codeone_demo_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return DEMO_USER; // Default to demo user for seamless presentation demo!
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('codeone_demo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('codeone_demo_user');
    }
  }, [user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const demoUser = { ...DEMO_USER, email: credentials.email };
      setUser(demoUser);
      return { success: true, user: demoUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAsDemo = useCallback(() => {
    setUser({ ...DEMO_USER });
    return { success: true, user: DEMO_USER };
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    try {
      const newUser = {
        ...DEMO_USER,
        name: userData.name || DEMO_USER.name,
        handle: userData.handle || DEMO_USER.handle,
        email: userData.email || DEMO_USER.email,
      };
      setUser(newUser);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    localStorage.removeItem('codeone_demo_user');
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    loginAsDemo,
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
