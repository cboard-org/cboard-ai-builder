import BoardDisplayed from './@board/BoardPage';
import { BoardRecord } from '@/commonTypes/Board';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import {
  INITIAL_CONTENT_ID,
  STASHED_CONTENT_ID,
} from '@/app/[locale]/dashboard/constants';
import { getBoard } from './@board/actions';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  let board: BoardRecord | null = null;
  const preventFetch = id === INITIAL_CONTENT_ID || id === STASHED_CONTENT_ID;
  if (!preventFetch) {
    try {
      board = await getBoard(id);

      if (!board) {
        throw new Error('board not found');
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <IntlWrapperForAsync propertyName={['Board']}>
      <BoardDisplayed remoteInitialBoard={board} id={id} />
    </IntlWrapperForAsync>
  );
}
