'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { DemoUser } from '@/types';

interface AuthContextType {
  currentUser: DemoUser | null;
  isAuthenticated: boolean;
  isMounted: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: { name: string; email: string; password: string }) => { success: boolean; error?: string };
  updateProfile: (updated: Partial<DemoUser>) => { success: boolean; error?: string };
  logout: () => void;
  getDemoCredentials: () => { email: string; password: string; name: string };
}

const USERS_STORAGE_KEY = 'innovanta_demo_users_v1';
const SESSION_STORAGE_KEY = 'innovanta_demo_session_v1';
const AUTH_EVENT_NAME = 'innovanta-auth-change';

const DEFAULT_DEMO_USER: DemoUser = {
  id: 'usr-demo-seed-001',
  name: 'Alex Vance',
  email: 'demo@innovanta.com',
  password: 'innovanta2026',
  role: 'Systems Architect & Pioneer',
  bio: 'Exploring the intersection of architectural engineering, thoughtful interfaces, and autonomous systems.',
  createdAt: 'October 2026',
  avatarColor: '#C87D32',
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  isMounted: false,
  login: () => ({ success: false, error: 'Context not initialized' }),
  signup: () => ({ success: false, error: 'Context not initialized' }),
  updateProfile: () => ({ success: false, error: 'Context not initialized' }),
  logout: () => {},
  getDemoCredentials: () => ({
    email: DEFAULT_DEMO_USER.email,
    password: DEFAULT_DEMO_USER.password || 'innovanta2026',
    name: DEFAULT_DEMO_USER.name,
  }),
});

function getStoredUsers(): DemoUser[] {
  if (typeof window === 'undefined') return [DEFAULT_DEMO_USER];
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      return [DEFAULT_DEMO_USER];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      return [DEFAULT_DEMO_USER];
    }
    return parsed;
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

function getStoredSessionUserId(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<DemoUser | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Sync state from storage
  const syncFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const users = getStoredUsers();
      const activeId = getStoredSessionUserId();
      if (!activeId) {
        setCurrentUser(null);
        return;
      }
      const matched = users.find((u) => u.id === activeId);
      setCurrentUser(matched || null);
    } catch {
      setCurrentUser(null);
    }
  }, []);

  // Initialize and listen to storage / custom events
  useEffect(() => {
    setIsMounted(true);
    syncFromStorage();

    const handleStorageChange = () => {
      syncFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(AUTH_EVENT_NAME, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(AUTH_EVENT_NAME, handleStorageChange);
    };
  }, [syncFromStorage]);

  const notifyChange = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event(AUTH_EVENT_NAME));
    }
  };

  const login = (email: string, password: string) => {
    try {
      const users = getStoredUsers();
      const normalizedEmail = email.trim().toLowerCase();
      const user = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (!user) {
        return {
          success: false,
          error: 'Invalid credentials. Please verify your demo email and password.',
        };
      }

      localStorage.setItem(SESSION_STORAGE_KEY, user.id);
      setCurrentUser(user);
      notifyChange();
      return { success: true };
    } catch {
      return {
        success: false,
        error: 'Unable to process demo login. Browser storage might be disabled.',
      };
    }
  };

  const signup = ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const users = getStoredUsers();
      const normalizedEmail = email.trim().toLowerCase();

      const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
      if (existing) {
        return {
          success: false,
          error: 'An account with this email already exists. Please log in instead.',
        };
      }

      const colors = ['#C87D32', '#3A4D39', '#5C493E', '#987452', '#7C3AED'];
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];

      const newUser: DemoUser = {
        id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: name.trim(),
        email: normalizedEmail,
        password: password,
        role: 'Innovanta Member // Explorer',
        bio: 'Newly registered innovator ready to manifest bold ideas and build impact.',
        createdAt: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date()),
        avatarColor: chosenColor,
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      localStorage.setItem(SESSION_STORAGE_KEY, newUser.id);
      setCurrentUser(newUser);
      notifyChange();
      return { success: true };
    } catch {
      return {
        success: false,
        error: 'Failed to create demo account. Browser storage may be inaccessible.',
      };
    }
  };

  const updateProfile = (updated: Partial<DemoUser>) => {
    if (!currentUser) {
      return { success: false, error: 'No active session to update.' };
    }

    try {
      const users = getStoredUsers();
      const updatedUser: DemoUser = {
        ...currentUser,
        ...updated,
        name: updated.name ? updated.name.trim() : currentUser.name,
        email: updated.email ? updated.email.trim().toLowerCase() : currentUser.email,
      };

      // Check if new email is taken by another user
      if (updated.email && updated.email.toLowerCase() !== currentUser.email.toLowerCase()) {
        const conflict = users.find(
          (u) => u.id !== currentUser.id && u.email.toLowerCase() === updated.email!.trim().toLowerCase()
        );
        if (conflict) {
          return { success: false, error: 'That email is already registered to another account.' };
        }
      }

      const updatedUsers = users.map((u) => (u.id === currentUser.id ? updatedUser : u));
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      setCurrentUser(updatedUser);
      notifyChange();
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to save profile changes to browser storage.' };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      setCurrentUser(null);
      notifyChange();
    } catch {
      setCurrentUser(null);
    }
  };

  const getDemoCredentials = () => ({
    email: DEFAULT_DEMO_USER.email,
    password: DEFAULT_DEMO_USER.password || 'innovanta2026',
    name: DEFAULT_DEMO_USER.name,
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isMounted,
        login,
        signup,
        updateProfile,
        logout,
        getDemoCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
