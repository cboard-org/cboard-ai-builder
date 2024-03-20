import BoardDisplayed from './BoardPage';
import { BoardRecord } from '@/commonTypes/Board';
import testBoards from '@/dashboard/@board/testBoard.json';
import IntlWrapperForAsync from '@/components/IntlWrapperForAsync/IntlWrapperForAsync';

export default async function Page({ params }: { params: { id: string } }) {
  let board: BoardRecord | null = null;
  if (params.id !== 'create') {
    await fetch('https://postman-echo.com/delay/2', {
      cache: 'no-cache',
    });
    board = testBoards[1];
  }

  return (
    <IntlWrapperForAsync propertyName="Board">
      <BoardDisplayed board={board} />;
    </IntlWrapperForAsync>
  );
}
