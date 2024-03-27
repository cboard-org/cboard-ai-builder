'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect } from 'react';
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '../constants';

type RemoteInitialBoard = BoardRecord | null;

const useSetInitialBoard = (
  remoteInitialBoard: RemoteInitialBoard,
  id: string,
) => {
  const [setBoard, stashedDashboard, showInitialContent, cleanBoard] =
    useBoundStore(
      useShallow((state) => [
        state.setBoard,
        state.stashedDashboard,
        state.showInitialContent,
        state.cleanBoard,
      ]),
    );

  useEffect(() => {
    if (remoteInitialBoard) {
      return setBoard(remoteInitialBoard);
    }
  }, [setBoard, remoteInitialBoard]);
  useEffect(() => {
    if (!remoteInitialBoard && stashedDashboard.board) {
      if (id === STASHED_CONTENT_ID) return setBoard(stashedDashboard.board);
      if (id === INITIAL_CONTENT_ID) return showInitialContent();
    }
  }, [
    stashedDashboard,
    setBoard,
    remoteInitialBoard,
    id,
    showInitialContent,
    cleanBoard,
  ]);
};
export default function BoardPage({
  remoteInitialBoard,
  id,
}: {
  remoteInitialBoard: RemoteInitialBoard;
  id: string;
}) {
  const shouldDisplayInitialContent = useBoundStore(
    useShallow((state) => state.shouldDisplayInitialContent),
  );
  useSetInitialBoard(remoteInitialBoard, id);
  return shouldDisplayInitialContent ? <InitialContent /> : <BoardContainer />;
}
