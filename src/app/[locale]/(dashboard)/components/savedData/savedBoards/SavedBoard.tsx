import { getSavedBoardsData } from './actions';
import SavedBoardList from './SavedBoardList';

export default async function SavedBoard() {
  const initialData = await getSavedBoardsData();
  return <SavedBoardList initialData={initialData} />;
}
