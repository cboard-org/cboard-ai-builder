import BoardDisplayed from './BoardPage';
import { BoardRecord } from '@/commonTypes/Board';
import testBoards from '@/dashboard/@board/testBoard.json';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '@/dashboard/constants';

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  let board: BoardRecord | null = null;

  const preventFetch = id === INITIAL_CONTENT_ID || id === STASHED_CONTENT_ID;
  if (!preventFetch) {
    await fetch('https://postman-echo.com/delay/2', {
      cache: 'no-cache',
    });
    board = testBoards[1];
  }

  return (
    <IntlWrapperForAsync propertyName="Board">
      <BoardDisplayed remoteInitialBoard={board} />
    </IntlWrapperForAsync>
  );
}
