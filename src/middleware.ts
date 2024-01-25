import createMiddleware from 'next-intl/middleware';
import {
  supportedLocales,
  defaultLocale,
  localePrefix,
} from './intl/intl.constants';

export default createMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
