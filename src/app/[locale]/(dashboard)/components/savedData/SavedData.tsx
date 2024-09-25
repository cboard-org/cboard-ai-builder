import TabSelector from './TabsSelector';
import IntlAsyncComponentProvider from '@/components/IntlAsyncComponentProvider/IntlAsyncComponentProvider';
import History from './history/History';
import SavedBoard from './savedBoards/SavedBoard';

export default async function SavedData() {
  return (
    <IntlAsyncComponentProvider propertyName={'SavedData'}>
      <TabSelector history={<History />} savedBoard={<SavedBoard />} />
    </IntlAsyncComponentProvider>
  );
}
