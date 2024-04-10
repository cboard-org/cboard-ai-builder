import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { BoardRecord } from '@/commonTypes/Board';
import { INITIAL_CONTENT_ID } from '../constants';

type RemoteInitialBoard = BoardRecord | null;

export default function BoardPage({
  remoteInitialBoard,
  id,
}: {
  remoteInitialBoard: RemoteInitialBoard;
  id: string;
}) {
  return id === INITIAL_CONTENT_ID ? (
    <InitialContent newBoard />
  ) : (
    <BoardContainer remoteBoard={remoteInitialBoard} id={id} />
  );
}
