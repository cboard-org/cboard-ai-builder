import { NextIntlClientProvider } from 'next-intl';
import TabSelector from './Selector';

export default function SavedData({ history }: { history: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <TabSelector history={history} />
    </NextIntlClientProvider>
  );
}
