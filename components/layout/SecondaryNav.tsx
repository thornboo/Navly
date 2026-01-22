'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  Users,
  Bell,
  Database,
  Settings as SettingsIcon,
  Users as UsersIcon,
  FileText,
  CreditCard,
  Code,
  Plug,
  Shield,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecondaryNavProps {
  className?: string;
}

export const SecondaryNav: React.FC<SecondaryNavProps> = ({ className }) => {
  const menuItems = [
    {
      section: 'ACCOUNT',
      items: [
        { icon: User, label: 'Profile', href: '#' },
        { icon: Users, label: 'Teams', href: '#' },
        { icon: Bell, label: 'Notifications', href: '#' },
        { icon: Database, label: 'Storage accounts', href: '#' },
      ],
    },
    {
      section: 'WORKSPACE',
      items: [
        { icon: SettingsIcon, label: 'General', href: '#' },
        { icon: UsersIcon, label: 'Members', href: '#' },
        { icon: FileText, label: 'Plans', href: '#' },
        { icon: CreditCard, label: 'Billing', href: '#' },
        { icon: Code, label: 'Developers', href: '#' },
        { icon: Plug, label: 'Integrations', href: '#', active: true },
        { icon: Shield, label: 'Security', href: '#' },
        { icon: Mail, label: 'Email and calendar', href: '#' },
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
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Settings</span>
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
                return (
                  <motion.div key={itemIdx} whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                        item.active
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
