import BoardContainer from './BoardContainer';
import { BoardRecord } from '@/commonTypes/Board';

type RemoteInitialBoard = BoardRecord | null;

export default function BoardPage({
  remoteInitialBoard,
  id,
}: {
  remoteInitialBoard: RemoteInitialBoard;
  id: string;
}) {
  return <BoardContainer remoteBoard={remoteInitialBoard} id={id} />;
}
