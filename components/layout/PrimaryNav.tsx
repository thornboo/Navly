'use client';

import React from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bookmark,
  Youtube,
  MessageCircle,
  Settings,
  Home,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from './SidebarContext';
import { MotionButton } from '@/components/ui';

interface PrimaryNavProps {
  className?: string;
}

export const PrimaryNav: React.FC<PrimaryNavProps> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { isExpanded, toggleSidebar } = useSidebar();

  const navItems = [
    { icon: Search, label: t('search'), path: '/', hasSubmenu: true },
    { icon: Bookmark, label: t('bookmarks'), path: '/bookmarks', hasSubmenu: true },
    { icon: Youtube, label: t('bilibili'), path: '/bilibili', hasSubmenu: true },
    { icon: MessageCircle, label: t('linuxdo'), path: '/linuxdo', hasSubmenu: false },
    { icon: Settings, label: t('settings'), path: '/settings', hasSubmenu: false },
  ];

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <motion.nav
      initial={false}
      animate={{
        width: isExpanded ? 200 : 64,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={cn(
        'relative flex flex-col border-r border-zinc-200 bg-zinc-50 py-4 dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      {/* Logo */}
      <div className={cn('mb-6 flex items-center gap-3', isExpanded ? 'px-4' : 'justify-center')}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          <span className="text-lg font-bold">N</span>
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
            >
              {tCommon('appName')}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex flex-1 flex-col gap-2 px-2">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <MotionButton
              variant="ghost"
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                isExpanded ? 'justify-start' : 'justify-center',
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </MotionButton>
          );
        })}
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col gap-2 border-t border-zinc-200 px-2 pt-4 dark:border-zinc-800">
        <MotionButton
          variant="ghost"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleSidebar}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
            isExpanded ? 'justify-start' : 'justify-center'
          )}
          title={!isExpanded ? tCommon('expand') : undefined}
        >
          {isExpanded ? (
            <ChevronLeft size={20} className="flex-shrink-0" />
          ) : (
            <ChevronRight size={20} className="flex-shrink-0" />
          )}
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {tCommon('collapse')}
              </motion.span>
            )}
          </AnimatePresence>
        </MotionButton>
        <MotionButton
          variant="ghost"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNavClick('/')}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
            isExpanded ? 'justify-start' : 'justify-center'
          )}
          title={!isExpanded ? tCommon('home') : undefined}
        >
          <Home size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {tCommon('home')}
              </motion.span>
            )}
          </AnimatePresence>
        </MotionButton>
        <MotionButton
          variant="ghost"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50',
            isExpanded ? 'justify-start' : 'justify-center'
          )}
          title={!isExpanded ? tCommon('help') : undefined}
        >
          <HelpCircle size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium"
              >
                {tCommon('help')}
              </motion.span>
            )}
          </AnimatePresence>
        </MotionButton>
      </div>
    </motion.nav>
  );
};
