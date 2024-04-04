import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import { SavedBoardsData } from '../savedBoards/actions';
import History from '../history/History';

export default async function SavedData() {
  const initialSavedBoards: SavedBoardsData[] = [];
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector
        history={<History />}
        initialSavedBoards={initialSavedBoards}
      />
    </IntlWrapperForAsync>
  );
}
