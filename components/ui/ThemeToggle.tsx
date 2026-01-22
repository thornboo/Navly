'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';
const THEME_CHANGE_EVENT = 'navly:theme-change';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getStoredTheme = (): Theme | null => {
  const value = localStorage.getItem(THEME_STORAGE_KEY);
  if (value === 'light' || value === 'dark') return value;
  return null;
};

const getThemeSnapshot = (): Theme => getStoredTheme() ?? getSystemTheme();

const getThemeServerSnapshot = (): Theme => 'light';

const subscribeTheme = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const onMediaChange = () => onStoreChange();
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onStoreChange();
  };
  const onThemeChange = () => onStoreChange();

  mediaQuery.addEventListener('change', onMediaChange);
  window.addEventListener('storage', onStorage);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);

  return () => {
    mediaQuery.removeEventListener('change', onMediaChange);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
  };
};

export const ThemeToggle: React.FC = () => {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'light' ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
