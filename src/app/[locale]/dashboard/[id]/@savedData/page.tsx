import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import History from '../history/History';
import SavedBoard from '../savedBoards/SavedBoard';

export default async function SavedData() {
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector history={<History />} savedBoard={<SavedBoard />} />
    </IntlWrapperForAsync>
  );
}
