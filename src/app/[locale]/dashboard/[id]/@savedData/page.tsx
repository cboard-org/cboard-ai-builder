import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import { getSavedBoardsData } from '../savedBoards/actions';
import { getPromptHistoryData } from '../history/actions';

export default async function SavedData() {
  const initialHistory = await getPromptHistoryData();
  const initialSavedBoards = await getSavedBoardsData();
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector
        initialHistory={initialHistory}
        initialSavedBoards={initialSavedBoards}
      />
    </IntlWrapperForAsync>
  );
}
