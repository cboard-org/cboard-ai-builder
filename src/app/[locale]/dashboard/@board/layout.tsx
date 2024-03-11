import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';

export default function BoardPage({ children }: { children: React.ReactNode }) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, 'Board')}>
      {children}
    </NextIntlClientProvider>
  );
}
