import { NextIntlClientProvider } from 'next-intl';
import TabSelector from './TabsSelector';

export default function SavedData({
  history,
  savedBoards,
}: {
  history: React.ReactNode;
  savedBoards: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider>
      <TabSelector history={history} savedBoards={savedBoards} />
    </NextIntlClientProvider>
  );
}
