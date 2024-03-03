import { createStore } from 'zustand';
import { BoardRecord } from '@/dashboard/@board/types';
import { devtools } from 'zustand/middleware';

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
};

export type BoardStore = BoardRecord & BoardActions;

export const defaultBoardState: BoardRecord = {
  id: '',
  isPublic: false,
  tiles: [],
  isFixed: false,
  author: '',
  email: '',
  lastEdited: '',
  grid: { rows: 5, columns: 5, order: [] },
  cellSize: '',
};

export const createBoardStore = (initState: BoardRecord = defaultBoardState) =>
  createStore<BoardStore>()(
    devtools((set) => ({
      ...initState,
      setBoard: (board: BoardRecord) =>
        set(() => ({ ...board }), false, { type: 'Board/setBoard', board }),
    })),
  );
