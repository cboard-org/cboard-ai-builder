import { getPromptHistoryData } from './actions';
import HistoryList from './HistoryList';

export default async function History() {
  const initialData = await getPromptHistoryData();
  return <HistoryList initialData={initialData} />;
}
