import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { supportedLocales } from './intl.constants';

export default getRequestConfig(async ({ locale }) => {
  if (!supportedLocales.includes(locale)) notFound();

  return {
    messages: (await import(`./dictionaries/${locale}.json`)).default,
  };
});
