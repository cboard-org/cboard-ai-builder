import { getSavedBoardsData } from './actions';
import SavedBoardList from './SavedBoardList';

export default async function Page() {
  const data = await getSavedBoardsData();
  return <SavedBoardList initialData={data} />;
}
