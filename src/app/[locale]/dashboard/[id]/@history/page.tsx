import { NextIntlClientProvider } from 'next-intl';
import { getHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function Page() {
  const historyData = await getHistoryData();
  return (
    <NextIntlClientProvider>
      <HistoryList initialHistories={historyData} />
    </NextIntlClientProvider>
  );
}
