'use client';

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: Category['id'];
  onCategoryChange: (categoryId: Category['id']) => void;
  className?: string;
  layout?: 'wrap' | 'scroll';
  counts?: Partial<Record<Category['id'], number>>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  className,
  layout = 'wrap',
  counts,
}) => {
  return (
    <div
      className={cn(
        'flex gap-2',
        layout === 'wrap' ? 'flex-wrap' : 'flex-nowrap overflow-x-auto',
        className
      )}
    >
      {categories.map((category) => (
        <Button
          variant="ghost"
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === category.id
              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          )}
        >
          <span className="whitespace-nowrap">{category.name}</span>
          {typeof counts?.[category.id] === 'number' ? (
            <span
              className={cn(
                'ml-1 rounded-md px-1.5 py-0.5 text-[11px]',
                activeCategory === category.id
                  ? 'bg-white/15 text-white dark:bg-zinc-900/15 dark:text-zinc-900'
                  : 'bg-zinc-900/10 text-zinc-700 dark:bg-zinc-50/10 dark:text-zinc-300'
              )}
            >
              {counts[category.id]}
            </span>
          ) : null}
        </Button>
      ))}
    </div>
  );
};
