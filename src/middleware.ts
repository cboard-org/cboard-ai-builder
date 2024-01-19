import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import {
  supportedLocales,
  defaultLocale,
  localePrefix,
} from './intl/intl.constants';
import { withAuth } from 'next-auth/middleware';
// export default createMiddleware({
//   locales: supportedLocales,
//   defaultLocale,
//   localePrefix,
// });

// const intlMiddleware = createIntlMiddleware({
//   locales: supportedLocales,
//   defaultLocale,
//   localePrefix,
// });

// const authMiddleware = withAuth(
//   function onSuccess(req) {
//     return intlMiddleware(req);
//   }
// );

// export default withAuth({});

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

const publicPages = [
  // '/',
  '/login',
  // (/secret requires auth)
];

const intlMiddleware = createIntlMiddleware({
  locales: supportedLocales,
  defaultLocale,
  localePrefix,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    // pages: {
    //   signIn: '/login',
    // },
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${supportedLocales.join('|')}))?(${publicPages
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
