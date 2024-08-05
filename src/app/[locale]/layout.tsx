import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
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
          <ThemeProvider theme={theme}>
            <StoreProvider>
              <NextIntlClientProvider messages={pick(messages, 'Dashboard')}>
                {children}
              </NextIntlClientProvider>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
