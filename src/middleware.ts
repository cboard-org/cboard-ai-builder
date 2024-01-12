import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en-US', 'de'],

  // Used when no locale matches
  defaultLocale: 'en-US',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en-US)/:path*'],
};
