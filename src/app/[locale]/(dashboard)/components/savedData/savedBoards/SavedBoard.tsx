import { getCachedSavedBoardsData } from './actions';
import SavedBoardList from './SavedBoardList';

export default async function SavedBoard() {
  const initialData = await getCachedSavedBoardsData();
  return <SavedBoardList initialData={initialData} />;
}
