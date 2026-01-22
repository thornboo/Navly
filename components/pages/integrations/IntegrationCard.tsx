'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Integration } from '@/types';
import { BrandIcon } from '@/components/ui';
import { cn } from '@/lib/utils';

interface IntegrationCardProps {
  integration: Integration;
  featured?: boolean;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  featured = false,
}) => {
  const { name, description, url, backgroundColor, icon } = integration;

  // If `icon` is a path-like string, extract a brand slug (e.g. "/icons/github.svg" -> "github").
  const brandSlug = icon?.split('/').pop()?.replace('.svg', '') || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group relative flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700',
          featured && 'md:col-span-1'
        )}
      >
        <div className="mb-3">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <BrandIcon brand={brandSlug} name={name} size={48} backgroundColor={backgroundColor} />
          </motion.div>
        </div>

        <div className="flex-1">
          <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">{name}</h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[2.5rem]">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
