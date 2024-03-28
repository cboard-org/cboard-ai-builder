import { NextIntlClientProvider } from 'next-intl';
import { getPromptHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function Page() {
  const historyData = await getPromptHistoryData();
  return (
    <NextIntlClientProvider>
      <HistoryList histories={historyData} />
    </NextIntlClientProvider>
  );
}
