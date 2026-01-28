'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { MotionButton } from './motion-button';
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  markThemeHydrated,
  subscribeTheme,
  toggleTheme as toggleThemePreference,
} from '@/lib/theme';

type ThemeToggleProps = {
  className?: string;
  variant?: React.ComponentProps<typeof MotionButton>['variant'];
  size?: React.ComponentProps<typeof MotionButton>['size'];
  showLabel?: boolean;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className,
  variant = 'topbarIconOutline',
  size = 'icon',
  showLabel = false,
}) => {
  const t = useTranslations('common');
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    markThemeHydrated();
    // Force a refresh after hydration so UI reflects the theme that was applied
    // by the inline bootstrap script (or persisted preference).
    window.dispatchEvent(new Event('navly:theme-change'));
  }, []);

  const onToggleTheme = () => {
    toggleThemePreference(theme);
  };

  return (
    <MotionButton
      variant={variant}
      size={size}
      onClick={onToggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={theme === 'light' ? t('switchToDark') : t('switchToLight')}
      className={className}
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
      {showLabel ? (
        <span className="font-medium">{theme === 'dark' ? t('darkMode') : t('lightMode')}</span>
      ) : null}
    </MotionButton>
  );
};
