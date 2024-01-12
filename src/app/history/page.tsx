import { getHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function Page() {
  const historyData = await getHistoryData();
  return <HistoryList initialHistories={historyData} />;
}
