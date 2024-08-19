import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import History from '../[id]/history/History';
import SavedBoard from '../[id]/savedBoards/SavedBoard';

export default async function Default() {
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector history={<History />} savedBoard={<SavedBoard />} />
    </IntlWrapperForAsync>
  );
}
