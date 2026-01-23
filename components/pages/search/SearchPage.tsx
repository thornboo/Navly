'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, TrendingUp, Bell, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Integration } from '@/types';
import { getIntegrations } from '@/lib/data';
import { IntegrationCard } from '../integrations/IntegrationCard';
import { Input, ThemeToggle, LanguageToggle, MotionButton, Button } from '@/components/ui';
import { MainLayout } from '@/components/layout';

export const SearchPage: React.FC = () => {
  const t = useTranslations('search');
  const tCommon = useTranslations('common');

  const [searchQuery, setSearchQuery] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load integration data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getIntegrations();
        setIntegrations(data);
      } catch (error) {
        console.error('Failed to load integrations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Load recent search history
    const saved = localStorage.getItem('navly_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  // Filter integrations based on search query
  const filteredIntegrations = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return integrations.filter((integration) => {
      const matchName = integration.name.toLowerCase().includes(query);
      const matchDescription = integration.description.toLowerCase().includes(query);
      const matchTags = integration.tags?.some((tag) => tag.toLowerCase().includes(query));
      const matchCategory = integration.category.toLowerCase().includes(query);

      return matchName || matchDescription || matchTags || matchCategory;
    });
  }, [integrations, searchQuery]);

  // Popular integrations (sorted by featured and order)
  const popularIntegrations = useMemo(() => {
    return [...integrations]
      .filter((i) => i.featured)
      .sort((a, b) => (b.order || 0) - (a.order || 0))
      .slice(0, 6);
  }, [integrations]);

  // Save search to history
  const saveSearch = (query: string) => {
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('navly_recent_searches', JSON.stringify(updated));
  };

  // Handle search input
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      saveSearch(value.trim());
    }
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('navly_recent_searches');
  };

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
              <span>{t('addIntegration')}</span>
            </MotionButton>
          </div>
        </div>

        {/* Search area */}
        <div className="border-b border-zinc-200 bg-white px-8 py-6 dark:border-zinc-800 dark:bg-zinc-950">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{t('description')}</p>
          </motion.div>

          {/* Search input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder={t('placeholder')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 pl-11 pr-11 text-base"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <X size={18} />
              </Button>
            )}
          </motion.div>
        </div>

        {/* Search content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            // Loading state
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="animate-spin text-muted-foreground" size={32} />
            </div>
          ) : searchQuery.trim() ? (
            // Search results
            <AnimatePresence mode="wait">
              {filteredIntegrations.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4 text-sm text-muted-foreground">
                    {t('resultsCount', { count: filteredIntegrations.length })}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredIntegrations.map((integration) => (
                      <IntegrationCard key={integration.id} integration={integration} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-64 flex-col items-center justify-center text-center"
                >
                  <Search className="mb-4 text-muted-foreground" size={48} />
                  <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {t('noResults')}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t('noResultsDescription')}</p>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            // Default state (recent searches + popular integrations)
            <div className="space-y-8">
              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {t('recentSearches')}
                    </h2>
                    <Button
                      variant="link"
                      onClick={clearRecentSearches}
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                    >
                      {t('clear')}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <MotionButton
                        variant="outline"
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        onClick={() => setSearchQuery(search)}
                        className="rounded-full border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                      >
                        {search}
                      </MotionButton>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Popular integrations */}
              {popularIntegrations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-muted-foreground" />
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {t('popularIntegrations')}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {popularIntegrations.map((integration) => (
                      <IntegrationCard key={integration.id} integration={integration} featured />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
