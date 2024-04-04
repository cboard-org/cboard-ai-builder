'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect, useState } from 'react';
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '../constants';

type RemoteInitialBoard = BoardRecord | null;

const useSetInitialBoard = (
  remoteInitialBoard: RemoteInitialBoard,
  id: string,
) => {
  const [setBoard, stashedDashboard, showInitialContent] = useBoundStore(
    useShallow((state) => [
      state.setBoard,
      state.stashedDashboard,
      state.showInitialContent,
    ]),
  );

  useEffect(() => {
    if (remoteInitialBoard) {
      return setBoard(remoteInitialBoard);
    }
  }, [setBoard, remoteInitialBoard]);

  const [initialStashedBoard, setInitialStashedBoard] =
    useState<BoardRecord | null>(null);

  useEffect(() => {
    if (stashedDashboard.board !== null && initialStashedBoard === null) {
      setInitialStashedBoard(stashedDashboard.board);
    }
  }, [stashedDashboard.board, initialStashedBoard]);

  useEffect(() => {
    if (!remoteInitialBoard && initialStashedBoard) {
      if (id === STASHED_CONTENT_ID) return setBoard(initialStashedBoard);
      if (id === INITIAL_CONTENT_ID) return showInitialContent();
    }
  }, [
    setBoard,
    remoteInitialBoard,
    id,
    showInitialContent,
    initialStashedBoard,
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
