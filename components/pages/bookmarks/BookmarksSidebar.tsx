'use client';

import React from 'react';
import { Activity, Code, LayoutGrid, MessageCircle, Palette, Shield, Zap } from 'lucide-react';

import type { Category, CategoryType } from '@/types';
import { cn } from '@/lib/utils';

type TagColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'zinc';

const TAG_COLOR_CLASSES: Record<TagColor, string> = {
  red: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-300',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300',
  pink: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
  zinc: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-500/15 dark:text-zinc-300',
};

function hashToColor(value: string): TagColor {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  const palette: TagColor[] = [
    'red',
    'blue',
    'green',
    'purple',
    'pink',
    'orange',
    'yellow',
    'zinc',
  ];
  return palette[Math.abs(hash) % palette.length];
}

const iconByCategory: Partial<Record<CategoryType, React.ComponentType<{ size?: number }>>> = {
  all: LayoutGrid,
  devtools: Code,
  messaging: MessageCircle,
  monitoring: Activity,
  productivity: Zap,
  security: Shield,
  // Data uses `searching`, design稿希望显示“Design”，这里用 Palette 图标更贴合。
  searching: Palette,
};

type BookmarksSidebarProps = {
  categories: Category[];
  categoryCounts: Partial<Record<Category['id'], number>>;
  activeCategory: Category['id'];
  onCategoryChange: (categoryId: Category['id']) => void;
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  labels: {
    categories: string;
    tags: string;
    designCategoryName: string;
  };
  className?: string;
};

export function BookmarksSidebar({
  categories,
  categoryCounts,
  activeCategory,
  onCategoryChange,
  tags,
  selectedTags,
  onToggleTag,
  labels,
  className,
}: BookmarksSidebarProps) {
  return (
    <aside
      className={cn(
        'w-72 shrink-0 border-r border-zinc-200 bg-white px-4 py-5 dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      <div className="space-y-8">
        <section>
          <div className="mb-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {labels.categories}
          </div>
          <div className="space-y-1">
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              const Icon = iconByCategory[category.id] ?? LayoutGrid;
              const count = categoryCounts[category.id] ?? 0;
              const name = category.id === 'searching' ? labels.designCategoryName : category.name;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                  )}
                >
                  <Icon size={16} />
                  <span className="flex-1 text-left">{name}</span>
                  <span
                    className={cn(
                      'min-w-7 rounded-full px-2 py-0.5 text-center text-xs',
                      isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200'
                        : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-3 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {labels.tags}
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = selectedTags.includes(tag);
              const color = hashToColor(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    'rounded-full px-2.5 py-1 text-xs font-medium transition-opacity',
                    TAG_COLOR_CLASSES[color],
                    selected
                      ? 'opacity-100 ring-1 ring-zinc-900/10 dark:ring-zinc-50/10'
                      : 'opacity-70 hover:opacity-100'
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}
