'use client';

import React from 'react';
import { usePathname } from '@/i18n/routing';
import { SidebarProvider } from './SidebarContext';
import { PrimaryNav } from './PrimaryNav';
import { SearchSubmenu } from './SearchSubmenu';
import { BookmarksSubmenu } from './BookmarksSubmenu';
import { BilibiliSubmenu } from './BilibiliSubmenu';

interface MainLayoutProps {
  children: React.ReactNode;
  showSubmenu?: boolean;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, showSubmenu = true }) => {
  const pathname = usePathname();

  // Determine which submenu to display based on the current path
  const renderSubmenu = () => {
    if (!showSubmenu) return null;

    if (pathname === '/' || pathname.startsWith('/search')) {
      return <SearchSubmenu />;
    }
    if (pathname.startsWith('/bookmarks')) {
      return <BookmarksSubmenu />;
    }
    if (pathname.startsWith('/bilibili')) {
      return <BilibiliSubmenu />;
    }
    return null;
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900">
        <PrimaryNav />

        {renderSubmenu()}

        <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">{children}</main>
      </div>
    </SidebarProvider>
  );
};
