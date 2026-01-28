import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run the i18n middleware for all pages (including unprefixed default-locale routes like `/bookmarks`),
  // while excluding Next.js internals and static files.
  matcher: ['/', '/(zh|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
