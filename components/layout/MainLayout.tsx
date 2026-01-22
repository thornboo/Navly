'use client';

import React from 'react';
import { PrimaryNav } from './PrimaryNav';
import { SecondaryNav } from './SecondaryNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <PrimaryNav />

      <SecondaryNav />

      <main className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-zinc-900">{children}</main>
    </div>
  );
};
