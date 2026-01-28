import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Search as SearchIcon } from 'lucide-react';

import { MainLayout } from '@/components/layout';

const SECTION_LABEL_KEY: Record<string, string> = {
  recent: 'submenu.recent',
  favorites: 'submenu.favorites',
  devtools: 'submenu.devtools',
  productivity: 'submenu.productivity',
  design: 'submenu.design',
};

export default async function SearchSectionPage({ params }: { params: { section: string } }) {
  const labelKey = SECTION_LABEL_KEY[params.section];
  if (!labelKey) notFound();

  const t = await getTranslations({ namespace: 'search' });

  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        {/* Top bar */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-8 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t('title')}</h1>
            <span className="text-sm text-muted-foreground">{t(labelKey)}</span>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <SearchIcon size={64} className="mb-4 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {t(labelKey)}
            </h2>
            <p className="text-sm text-muted-foreground">{t('description')}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
