'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Code, LayoutGrid, MessageCircle, Activity, Zap, Shield, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCategories } from '@/lib/data';
import type { Category } from '@/types';

interface BookmarksSubmenuProps {
  className?: string;
}

export const BookmarksSubmenu: React.FC<BookmarksSubmenuProps> = ({ className }) => {
  const pathname = usePathname();
  const t = useTranslations('bookmarks');

  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await getCategories();
      if (cancelled) return;
      setCategories(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const iconByCategory: Partial<Record<Category['id'], React.ComponentType<{ size?: number }>>> = {
    all: LayoutGrid,
    devtools: Code,
    messaging: MessageCircle,
    monitoring: Activity,
    productivity: Zap,
    security: Shield,
    searching: Search,
  };

  const items = categories.map((category) => {
    const href = category.id === 'all' ? '/bookmarks' : `/bookmarks/${category.id}`;
    return {
      id: category.id,
      label: category.name,
      href,
      Icon: iconByCategory[category.id] ?? LayoutGrid,
    };
  });

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'flex w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{t('title')}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="mb-2 px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {t('integrations')}
          </div>
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.Icon;
              return (
                <motion.div key={item.id} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50'
                        : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                    )}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </nav>
    </motion.aside>
  );
};
