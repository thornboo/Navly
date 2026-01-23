'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, Heart, Clock, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BilibiliSubmenuProps {
  className?: string;
}

export const BilibiliSubmenu: React.FC<BilibiliSubmenuProps> = ({ className }) => {
  const pathname = usePathname();
  const t = useTranslations('bilibili');

  const menuItems = [
    {
      section: t('sections.mine'),
      items: [
        { icon: Star, label: t('menu.favorites'), href: '/bilibili/favorites' },
        { icon: Heart, label: t('menu.following'), href: '/bilibili/following' },
        { icon: Clock, label: t('menu.history'), href: '/bilibili/history' },
      ],
    },
    {
      section: t('sections.categories'),
      items: [
        { icon: Folder, label: t('menu.anime'), href: '/bilibili/anime' },
        { icon: Folder, label: t('menu.tech'), href: '/bilibili/tech' },
        { icon: Folder, label: t('menu.life'), href: '/bilibili/life' },
      ],
    },
  ];

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
        {menuItems.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="mb-6"
          >
            <div className="mb-2 px-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {section.section}
            </div>
            <div className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <motion.div key={itemIdx} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
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
        ))}
      </nav>
    </motion.aside>
  );
};
