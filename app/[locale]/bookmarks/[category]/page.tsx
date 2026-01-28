import { notFound } from 'next/navigation';

import { BookmarksPage } from '@/components/pages/bookmarks';
import type { CategoryType } from '@/types';

const ALLOWED: ReadonlyArray<CategoryType> = [
  'devtools',
  'messaging',
  'monitoring',
  'productivity',
  'security',
  'searching',
];

export default function BookmarksCategoryPage({ params }: { params: { category: string } }) {
  if (!ALLOWED.includes(params.category as CategoryType)) notFound();

  return <BookmarksPage initialCategory={params.category as CategoryType} />;
}
