export const SIDEBAR_STORAGE_KEY = 'navly-sidebar-expanded';
export const SIDEBAR_CHANGE_EVENT = 'navly:sidebar-change';

let hasHydrated = false;
let expanded = true;

function readStoredExpanded(): boolean | null {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

function persistExpanded(value: boolean) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value));
  } catch {
    // ignore
  }
}

export function markSidebarHydrated() {
  hasHydrated = true;
  const stored = readStoredExpanded();
  if (stored !== null) expanded = stored;
}

export function getSidebarServerSnapshot() {
  return true;
}

export function getSidebarSnapshot() {
  if (typeof window === 'undefined') return true;
  // Avoid hydration mismatch: keep initial client snapshot aligned with server.
  if (!hasHydrated) return true;
  return expanded;
}

export function subscribeSidebar(onStoreChange: () => void) {
  const onChange = () => onStoreChange();

  window.addEventListener(SIDEBAR_CHANGE_EVENT, onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SIDEBAR_STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(SIDEBAR_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

export function setSidebarExpanded(value: boolean) {
  expanded = value;
  persistExpanded(value);
  window.dispatchEvent(new Event(SIDEBAR_CHANGE_EVENT));
}

export function toggleSidebarExpanded() {
  setSidebarExpanded(!expanded);
}
