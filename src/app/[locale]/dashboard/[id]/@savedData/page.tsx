import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import { getSavedBoardsData } from '../savedBoards/actions';

export default async function SavedData({
  history,
}: {
  history: React.ReactNode;
}) {
  const initialSavedBoards = await getSavedBoardsData();
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector history={history} initialSavedBoards={initialSavedBoards} />
    </IntlWrapperForAsync>
  );
}
