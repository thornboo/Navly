'use client';

import React from 'react';
import { Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: Category['id'];
  onCategoryChange: (categoryId: Category['id']) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
            activeCategory === category.id
              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
