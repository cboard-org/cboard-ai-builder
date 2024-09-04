import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeProvider from '@/providers/ThemeProvider';
import StoreProvider from '@/providers/StoreProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cboard AI Builder',
  description:
    'Generate your communication boards quickly using the power of AI.',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <NextIntlClientProvider
              messages={pick(messages, ['Dashboard', 'Settings'])}
            >
              <ThemeProvider>{children}</ThemeProvider>
            </NextIntlClientProvider>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
