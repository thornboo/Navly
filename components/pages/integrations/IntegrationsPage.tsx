'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Filter, Loader2, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { LanguageToggle, MotionButton, ThemeToggle } from '@/components/ui';
import { getCategories, getIntegrations } from '@/lib/data';
import type { Category, Integration } from '@/types';
import { CategoryTabs } from './CategoryTabs';
import { IntegrationCard } from './IntegrationCard';
import { SearchBox } from './SearchBox';
import { useTranslations } from 'next-intl';

export const IntegrationsPage = () => {
  const t = useTranslations('integrations');
  const tCommon = useTranslations('common');

  const [activeCategory, setActiveCategory] = useState<Category['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [integrationsData, categoriesData] = await Promise.all([
          getIntegrations(),
          getCategories(),
        ]);
        setIntegrations(integrationsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredIntegrations = useMemo(() => {
    let filtered = integrations;

    if (activeCategory !== 'all') {
      filtered = filtered.filter((integration) => integration.category === activeCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (integration) =>
          integration.name.toLowerCase().includes(lowerQuery) ||
          integration.description.toLowerCase().includes(lowerQuery) ||
          integration.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return filtered;
  }, [integrations, activeCategory, searchQuery]);

  const displayedFeatured = useMemo(() => {
    return filteredIntegrations.filter((integration) => integration.featured);
  }, [filteredIntegrations]);

  const displayedNormal = useMemo(() => {
    return filteredIntegrations.filter((integration) => !integration.featured);
  }, [filteredIntegrations]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <Loader2 className="mb-4 inline-block animate-spin text-muted-foreground" size={32} />
            <p className="text-zinc-600 dark:text-zinc-400">{t('loading')}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="border-b border-zinc-200 bg-white px-8 py-6 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {t('title')}
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{t('description')}</p>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />

              <MotionButton
                variant="topbarIconOutline"
                size="icon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={tCommon('notifications')}
              >
                <Bell size={18} />
              </MotionButton>

              <MotionButton
                variant="topbarPrimary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={16} />
                {t('createIntegration')}
              </MotionButton>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500"
              >
                <span className="text-sm font-semibold text-white">T</span>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto p-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-6"
          >
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-6 flex items-center justify-between gap-4"
          >
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchPlaceholder')}
            />
            <MotionButton
              variant="outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Filter size={16} />
              {t('filter')}
            </MotionButton>
          </motion.div>

          {displayedFeatured.length > 0 && (
            <motion.section
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {t('featuredTitle')}
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {displayedFeatured.map((integration, idx) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + idx * 0.1 }}
                  >
                    <IntegrationCard integration={integration} featured />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {t('allTitle')}
            </h2>
            {displayedNormal.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedNormal.map((integration, idx) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                  >
                    <IntegrationCard integration={integration} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700"
              >
                <p className="text-zinc-500 dark:text-zinc-400">{t('empty')}</p>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </MainLayout>
  );
};
