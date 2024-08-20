import TabSelector from './TabsSelector';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import History from './_components/history/History';
import SavedBoard from './_components/savedBoards/SavedBoard';

export default async function Default() {
  return (
    <IntlWrapperForAsync propertyName={'SavedData'}>
      <TabSelector history={<History />} savedBoard={<SavedBoard />} />
    </IntlWrapperForAsync>
  );
}
