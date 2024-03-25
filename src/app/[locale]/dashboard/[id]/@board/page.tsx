import { NextIntlClientProvider, useMessages } from 'next-intl';
import BoardDisplayed from './BoardPage';
import pick from 'lodash.pick';

export default function Page() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, 'Board')}>
      <BoardDisplayed />
    </NextIntlClientProvider>
  );
}
