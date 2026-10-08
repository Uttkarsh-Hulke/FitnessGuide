import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('fitguide_theme');
        if (saved === 'dark' || saved === 'light') {
          return saved;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
      }
    } catch (e) {
      console.warn('Error reading theme preference:', e);
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;
    const isDark = theme === 'dark';

    if (isDark) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
      }
    }

    try {
      localStorage.setItem('fitguide_theme', theme);
    } catch (e) {
      console.warn('Error saving theme preference:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setDarkMode = () => setTheme('dark');
  const setLightMode = () => setTheme('light');

  return { 
    theme, 
    isDark: theme === 'dark', 
    toggleTheme, 
    setTheme,
    setDarkMode,
    setLightMode
  };
}
