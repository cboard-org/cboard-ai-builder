import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { supportedLocales, localePrefix } from './intl/intl.constants';

const locales = supportedLocales;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
