'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MainLayout } from '@/components/layout';

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <MainLayout showSubmenu={false}>
      <div className="flex h-full flex-col">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {t('appSettings')}
              </h2>
              <div className="space-y-4">
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {t('appearance.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('appearance.description')}</p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {t('notifications.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('notifications.description')}</p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {t('privacy.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('privacy.description')}</p>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="mb-2 font-medium text-zinc-900 dark:text-zinc-50">
                    {t('about.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('about.description')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
