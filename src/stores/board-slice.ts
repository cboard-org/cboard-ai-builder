import { StateCreator } from 'zustand';
import { BoardRecord } from '@/dashboard/@board/types';
import { Store } from './../providers/StoreProvider';

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
};

export type BoardSlice = { board: BoardRecord } & BoardActions;

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

export const createBoardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BoardSlice
> = (set) => ({
  board: { ...defaultBoardState },
  setBoard: (board: BoardRecord) =>
    set(() => ({ board: { ...board } }), false, {
      type: 'Board/setBoard',
      board,
    }),
});
