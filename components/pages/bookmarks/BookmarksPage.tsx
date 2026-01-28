'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Category, CategoryType, Integration } from '@/types';
import { getCategories, getIntegrations } from '@/lib/data';
import { cn } from '@/lib/utils';
import { MainLayout } from '@/components/layout';
import { MotionButton } from '@/components/ui';
import { IntegrationCard } from '@/components/pages/integrations/IntegrationCard';
import { SearchBox } from '@/components/pages/integrations/SearchBox';

import { BookmarksSidebar } from './BookmarksSidebar';

type SortMode = 'recent' | 'az';
type GridCols = 2 | 3 | 4;

type BookmarksPageProps = {
  initialCategory?: CategoryType;
};

const LAST_VISITED_KEY = 'navly_bookmarks_last_visited';
const GRID_COLS_KEY = 'navly_bookmarks_grid_cols';

function loadLastVisited(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LAST_VISITED_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, number>;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function saveLastVisited(map: Record<string, number>) {
  try {
    localStorage.setItem(LAST_VISITED_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

function loadGridCols(): GridCols {
  if (typeof window === 'undefined') return 2;
  const raw = localStorage.getItem(GRID_COLS_KEY);
  if (raw === '2' || raw === '3' || raw === '4') return Number(raw) as GridCols;
  return 2;
}

function saveGridCols(value: GridCols) {
  try {
    localStorage.setItem(GRID_COLS_KEY, String(value));
  } catch {
    // ignore
  }
}

function getGridClass(cols: GridCols) {
  switch (cols) {
    case 2:
      return 'grid-cols-1 sm:grid-cols-2';
    case 3:
      return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';
    case 4:
      return 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4';
  }
}

export function BookmarksPage({ initialCategory }: BookmarksPageProps) {
  const t = useTranslations('bookmarks');

  const [categories, setCategories] = useState<Category[]>([]);
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<CategoryType>(initialCategory ?? 'all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [lastVisited, setLastVisited] = useState<Record<string, number>>({});
  const [gridCols, setGridCols] = useState<GridCols>(2);

  useEffect(() => {
    setActiveCategory(initialCategory ?? 'all');
  }, [initialCategory]);

  useEffect(() => {
    setLastVisited(loadLastVisited());
  }, []);

  useEffect(() => {
    setGridCols(loadGridCols());
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [cats, items] = await Promise.all([getCategories(), getIntegrations()]);
        if (cancelled) return;
        setCategories(cats);
        setIntegrations(items);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category['id'], number>> = { all: integrations.length };
    for (const category of categories) {
      if (category.id === 'all') continue;
      counts[category.id] = integrations.filter((i) => i.category === category.id).length;
    }
    return counts;
  }, [integrations, categories]);

  const allTags = useMemo(() => {
    const freq = new Map<string, number>();
    for (const item of integrations) {
      for (const tag of item.tags ?? []) {
        freq.set(tag, (freq.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(freq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [integrations]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return integrations.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      if (selectedTags.length > 0) {
        const tags = item.tags ?? [];
        if (!selectedTags.every((t) => tags.includes(t))) return false;
      }

      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [integrations, activeCategory, selectedTags, searchQuery]);

  const sorted = useMemo(() => {
    if (sortMode === 'az') {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    const getTs = (id: string) => lastVisited[id] ?? 0;
    return [...filtered].sort((a, b) => getTs(b.id) - getTs(a.id));
  }, [filtered, sortMode, lastVisited]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleVisit = (item: Integration) => {
    const next = { ...lastVisited, [item.id]: Date.now() };
    setLastVisited(next);
    saveLastVisited(next);
  };

  const setCols = (value: GridCols) => {
    setGridCols(value);
    saveGridCols(value);
  };

  return (
    <MainLayout showSubmenu={false}>
      <div className="flex h-full flex-col">
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {t('title')}
            </div>
            <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
              {t('description')}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={t('searchPlaceholder')}
              className="w-96 max-w-none"
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
            <MotionButton
              variant="actionPrimary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              {t('addBookmark')}
            </MotionButton>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-900">
          <BookmarksSidebar
            categories={categories}
            categoryCounts={categoryCounts}
            activeCategory={activeCategory}
            onCategoryChange={(id) => setActiveCategory(id as CategoryType)}
            tags={allTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
            labels={{
              categories: t('sidebar.categories'),
              tags: t('sidebar.tags'),
              designCategoryName: t('sidebar.design'),
            }}
          />

          <div className="relative flex-1 overflow-y-auto p-8">
            {loading ? (
              <div className="flex h-64 items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
                {t('loading')}
              </div>
            ) : (
              <section>
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {t('allTitle')}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm dark:bg-zinc-950">
                      {[2, 3, 4].map((cols) => (
                        <button
                          key={cols}
                          type="button"
                          onClick={() => setCols(cols as GridCols)}
                          className={cn(
                            'rounded-md px-2 py-1 transition-colors',
                            gridCols === cols
                              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                              : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                          )}
                          title={t('layout.columns', { count: cols })}
                        >
                          {cols}
                        </button>
                      ))}
                    </div>

                    <div className="ml-2 flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm dark:bg-zinc-950">
                      <button
                        type="button"
                        onClick={() => setSortMode('recent')}
                        className={cn(
                          'rounded-md px-2 py-1 transition-colors',
                          sortMode === 'recent'
                            ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                        )}
                      >
                        {t('sort.recent')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setSortMode('az')}
                        className={cn(
                          'rounded-md px-2 py-1 transition-colors',
                          sortMode === 'az'
                            ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                        )}
                      >
                        {t('sort.az')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className={cn('grid gap-4', getGridClass(gridCols))}>
                  {sorted.map((item) => (
                    <IntegrationCard key={item.id} integration={item} onVisit={handleVisit} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
