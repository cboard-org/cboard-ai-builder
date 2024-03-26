'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect } from 'react';
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';

type RemoteInitialBoard = BoardRecord | null;

const useSetInitialBoard = (remoteInitialBoard: RemoteInitialBoard) => {
  const [setBoard, stashedDashboard] = useBoundStore(
    useShallow((state) => [state.setBoard, state.stashedDashboard]),
  );

  useEffect(() => {
    if (remoteInitialBoard) {
      return setBoard(remoteInitialBoard);
    }
  }, [setBoard, remoteInitialBoard]);
  useEffect(() => {
    if (!remoteInitialBoard && stashedDashboard.board)
      return setBoard(stashedDashboard.board);
  }, [stashedDashboard, setBoard, remoteInitialBoard]);
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
