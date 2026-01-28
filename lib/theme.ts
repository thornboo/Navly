export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'navly:theme-change';

let hasHydrated = false;

export function markThemeHydrated() {
  hasHydrated = true;
}

export function readThemeFromDom(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function toggleTheme(current: Theme) {
  setTheme(current === 'light' ? 'dark' : 'light');
}

export function getThemeServerSnapshot(): Theme {
  return 'light';
}

export function getThemeSnapshot(): Theme {
  if (typeof window === 'undefined') return 'light';
  // Avoid hydration mismatch: keep initial client snapshot aligned with server.
  if (!hasHydrated) return 'light';
  return readThemeFromDom();
}

export function subscribeTheme(onStoreChange: () => void) {
  const onChange = () => onStoreChange();

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'class') onChange();
    }
  });

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const onMediaChange = () => {
    // Only auto-follow system when user hasn't explicitly chosen a theme.
    if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
      onChange();
    }
  };
  mediaQuery.addEventListener('change', onMediaChange);

  return () => {
    observer.disconnect();
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
    mediaQuery.removeEventListener('change', onMediaChange);
  };
}
