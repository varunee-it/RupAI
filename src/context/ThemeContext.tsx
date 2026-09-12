import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  matchSystem: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setMatchSystem: (match: boolean) => void;
}

const THEME_KEY = 'rupai_theme';
const SYSTEM_KEY = 'rupai_match_system';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matchSystem, setMatchSystemState] = useState<boolean>(() => {
    return localStorage.getItem(SYSTEM_KEY) === 'true';
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (localStorage.getItem(SYSTEM_KEY) === 'true') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  });

  // Apply theme to documentElement
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // System theme media listener when matchSystem is enabled
  useEffect(() => {
    if (!matchSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setThemeState(e.matches ? 'dark' : 'light');
    };

    setThemeState(mediaQuery.matches ? 'dark' : 'light');

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [matchSystem]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const toggleTheme = () => {
    if (matchSystem) return;
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const setMatchSystem = (match: boolean) => {
    setMatchSystemState(match);
    localStorage.setItem(SYSTEM_KEY, String(match));

    if (match) {
      const isSysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(isSysDark ? 'dark' : 'light');
    } else {
      const saved = localStorage.getItem(THEME_KEY) as ThemeMode;
      setThemeState(saved === 'dark' ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, matchSystem, toggleTheme, setTheme, setMatchSystem }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
