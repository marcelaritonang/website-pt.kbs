'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Read auth state from cookie on mount
  useEffect(() => {
    try {
      const userCookie = getCookie('kbs_user');
      if (userCookie) {
        const parsed = JSON.parse(decodeURIComponent(userCookie));
        setUser(parsed);
      }
    } catch {
      // Invalid cookie, clear it
      deleteCookie('kbs_user');
      deleteCookie('kbs_token');
    }
    setLoading(false);
  }, []);

  const login = useCallback((token: string, userData: User) => {
    // Set cookies (7 days expiry)
    setCookie('kbs_token', token, 7);
    setCookie('kbs_user', encodeURIComponent(JSON.stringify(userData)), 7);
    // Also keep localStorage as backup
    localStorage.setItem('kbs_token', token);
    localStorage.setItem('kbs_user', JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    deleteCookie('kbs_token');
    deleteCookie('kbs_user');
    localStorage.removeItem('kbs_token');
    localStorage.removeItem('kbs_user');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Cookie helpers
function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
