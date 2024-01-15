/**
 * This file exports the wrapped versions of `Link`, `redirect`, `usePathname`, and `useRouter` functions.
 * They provide support for internationalization (i18n)
 * by automatically adding the locale prefix to the pathnames.
 * For more information on how to use these functions, refer to the documentation
 * at https://next-intl-docs.vercel.app/docs/routing/navigation#apis.
 **/

import { createSharedPathnamesNavigation } from 'next-intl/navigation';

import { supportedLocales, localePrefix } from './intl/intl.constants';

const locales = supportedLocales;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
