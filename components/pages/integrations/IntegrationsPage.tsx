'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Loader2, Plus } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { MotionButton } from '@/components/ui';
import { getCategories, getIntegrations } from '@/lib/data';
import type { Category, Integration } from '@/types';
import { CategoryTabs } from './CategoryTabs';
import { IntegrationCard } from './IntegrationCard';
import { SearchBox } from './SearchBox';
import { useTranslations } from 'next-intl';

type IntegrationsPageProps = {
  initialCategory?: Category['id'];
};

export const IntegrationsPage = ({ initialCategory }: IntegrationsPageProps) => {
  const t = useTranslations('bookmarks');

  const [activeCategory, setActiveCategory] = useState<Category['id']>(initialCategory ?? 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

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

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category['id'], number>> = { all: integrations.length };
    for (const category of categories) {
      if (category.id === 'all') continue;
      counts[category.id] = integrations.filter((i) => i.category === category.id).length;
    }
    return counts;
  }, [integrations, categories]);

  if (loading) {
    return (
      <MainLayout showSubmenu={false}>
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
    <MainLayout showSubmenu={false}>
      <div className="flex h-full flex-col">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="flex min-w-0 flex-col">
            <h1 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {t('title')}
            </h1>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{t('description')}</p>
          </div>
          <MotionButton
            variant="topbarPrimary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} />
            {t('addBookmark')}
          </MotionButton>
        </motion.div>

        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50/80 px-8 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="flex items-center gap-4">
              <CategoryTabs
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                layout="scroll"
                counts={categoryCounts}
                className="min-w-0 flex-1"
              />
              <SearchBox
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t('searchPlaceholder')}
                className="w-80 max-w-none shrink-0"
              />
              <MotionButton
                variant="outline"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Filter size={16} />
                {t('filter')}
              </MotionButton>
            </div>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              {t('resultsCount', { count: filteredIntegrations.length })}
            </div>
          </div>

          <div className="p-8">
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
      </div>
    </MainLayout>
  );
};
