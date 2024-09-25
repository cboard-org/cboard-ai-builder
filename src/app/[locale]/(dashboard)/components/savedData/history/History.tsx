import { getCachedPromptHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function History() {
  const initialData = await getCachedPromptHistoryData();
  return <HistoryList initialData={initialData} />;
}
