'use client';

import React, { createContext, useContext, useEffect, useSyncExternalStore } from 'react';
import {
  getSidebarServerSnapshot,
  getSidebarSnapshot,
  markSidebarHydrated,
  setSidebarExpanded,
  subscribeSidebar,
  toggleSidebarExpanded,
} from '@/lib/sidebar';

interface SidebarContextType {
  isExpanded: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    markSidebarHydrated();
    window.dispatchEvent(new Event('navly:sidebar-change'));
  }, []);

  const isExpanded = useSyncExternalStore(
    subscribeSidebar,
    getSidebarSnapshot,
    getSidebarServerSnapshot
  );

  const toggleSidebar = () => toggleSidebarExpanded();
  const collapseSidebar = () => setSidebarExpanded(false);
  const expandSidebar = () => setSidebarExpanded(true);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, collapseSidebar, expandSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
