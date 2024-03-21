import { NextIntlClientProvider } from 'next-intl';
import { getHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function Page() {
  const { data: initialHistories, pagination } = await getHistoryData({
    actualPage: 1,
    limitPages: 2,
    itemsPerPage: 2,
  });
  return (
    <NextIntlClientProvider>
      <HistoryList
        initialHistories={initialHistories}
        pagination={pagination}
      />
    </NextIntlClientProvider>
  );
}
