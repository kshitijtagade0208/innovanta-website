'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface IntroContextType {
  hasSeenIntro: boolean;
  isMounted: boolean;
  completeIntro: () => void;
  replayIntro: () => void;
}

const IntroContext = createContext<IntroContextType>({
  hasSeenIntro: false,
  isMounted: false,
  completeIntro: () => {},
  replayIntro: () => {},
});

const STORAGE_KEY = 'innovanta_intro_viewed_v1';

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenIntro, setHasSeenIntro] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === 'true') {
        setHasSeenIntro(true);
      }
    } catch {
      // Graceful fallback for restricted environments
    }
  }, []);

  const completeIntro = () => {
    setHasSeenIntro(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
  };

  const replayIntro = () => {
    setHasSeenIntro(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <IntroContext.Provider
      value={{
        hasSeenIntro,
        isMounted,
        completeIntro,
        replayIntro,
      }}
    >
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  return useContext(IntroContext);
}
