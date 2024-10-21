import { BoardRecord } from '@/commonTypes/Board';
import IntlAsyncComponentProvider from '@/components/IntlAsyncComponentProvider/IntlAsyncComponentProvider';
import {
  INITIAL_CONTENT_ID,
  STASHED_CONTENT_ID,
} from '@/app/[locale]/(dashboard)/constants';
import { getBoard } from './components/actions';
import BoardContainer from './components/BoardContainer';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  let board: BoardRecord | null = null;
  const preventFetch = id === INITIAL_CONTENT_ID || id === STASHED_CONTENT_ID;
  if (!preventFetch) {
    try {
      //board = await getCachedBoard(id);
      board = await getBoard(id);

      if (!board) {
        throw new Error('board not found');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <IntlAsyncComponentProvider propertyName={['Board']}>
      <BoardContainer remoteBoard={board} id={id} />
    </IntlAsyncComponentProvider>
  );
}
