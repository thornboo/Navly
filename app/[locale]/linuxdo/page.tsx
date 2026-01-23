'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout';
import { Bell, MessageCircle, Plus } from 'lucide-react';
import { ThemeToggle, LanguageToggle, MotionButton } from '@/components/ui';

export default function LinuxDoPage() {
  const t = useTranslations('linuxdo');
  const tCommon = useTranslations('common');

  return (
    <MainLayout showSubmenu={false}>
      <div className="flex h-full flex-col">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <MotionButton
              variant="topbarIcon"
              size="icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={tCommon('notifications')}
            >
              <Bell size={18} />
            </MotionButton>
            <LanguageToggle />
            <ThemeToggle />
            <MotionButton
              variant="topbarPrimary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} />
              <span>{t('createPost')}</span>
            </MotionButton>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-64 flex-col items-center justify-center text-center"
          >
            <MessageCircle size={64} className="mb-4 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t('pageTitle')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('pageDescription')}</p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
