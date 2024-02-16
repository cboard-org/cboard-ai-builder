import { NextIntlClientProvider, useMessages } from 'next-intl';
import TabSelector from './TabsSelector';
import pick from 'lodash.pick';

export default function SavedData({
  history,
  savedBoards,
}: {
  history: React.ReactNode;
  savedBoards: React.ReactNode;
}) {
  const messages = useMessages();
  return (
    <NextIntlClientProvider messages={pick(messages, 'SavedData')}>
      <TabSelector history={history} savedBoards={savedBoards} />
    </NextIntlClientProvider>
  );
}
