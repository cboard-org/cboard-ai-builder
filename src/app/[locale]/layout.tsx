import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ThemeProvider from '@/providers/ThemeProvider';
import StoreProvider from '@/providers/StoreProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';

const montserrat = Montserrat({ subsets: ['latin'] });

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
    <html
      lang={locale}
      suppressHydrationWarning
      className={montserrat.className}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* See MUI documentation for why we use suppressHydrationWarning https://mui.com/material-ui/customization/css-theme-variables/configuration/#next-js-app-router  */}
      <body className={montserrat.className}>
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
