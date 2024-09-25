import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';

export default function IntlAsyncComponentProvider({
  children,
  propertyName,
}: {
  children: React.ReactNode;
  propertyName: string | string[];
}) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, propertyName)}>
      {children}
    </NextIntlClientProvider>
  );
}
