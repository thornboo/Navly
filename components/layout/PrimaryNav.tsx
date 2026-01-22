'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, BarChart3, Settings, Home, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrimaryNavProps {
  className?: string;
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({ className }) => {
  const navItems = [
    { icon: Search, label: 'Search', active: false },
    { icon: FileText, label: 'Documents', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: true },
  ];

  return (
    <nav
      className={cn(
        'flex w-16 flex-col items-center border-r border-zinc-200 bg-zinc-50 py-4 dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        <span className="text-lg font-bold">N</span>
      </motion.div>

      {/* Nav Items */}
      <div className="flex flex-1 flex-col gap-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                item.active
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-300'
              )}
              title={item.label}
            >
              <Icon size={20} />
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          <Home size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
        >
          <HelpCircle size={20} />
        </motion.button>
      </div>
    </nav>
  );
};
