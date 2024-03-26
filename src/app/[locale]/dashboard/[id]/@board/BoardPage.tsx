'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect } from 'react';
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';

type RemoteInitialBoard = BoardRecord | null;

const useSetInitialBoard = (remoteInitialBoard: RemoteInitialBoard) => {
  const { setBoard, stashedDashboard } = useBoundStore((state) => state);

  useEffect(() => {
    if (remoteInitialBoard) {
      return setBoard(remoteInitialBoard);
    }
    if (stashedDashboard.board) return setBoard(stashedDashboard.board);
  }, [remoteInitialBoard, setBoard, , stashedDashboard]);
};
export default function BoardPage({
  remoteInitialBoard,
}: {
  remoteInitialBoard: RemoteInitialBoard;
}) {
  const shouldDisplayInitialContent = useBoundStore(
    useShallow((state) => state.shouldDisplayInitialContent),
  );
  useSetInitialBoard(remoteInitialBoard);
  return shouldDisplayInitialContent ? <InitialContent /> : <BoardContainer />;
}
