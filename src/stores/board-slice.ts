import { StateCreator } from 'zustand';
import { BoardRecord } from '@/dashboard/@board/types';
import { Store } from './../providers/StoreProvider';

export type BoardStoreRecord = BoardRecord | null;

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
  cleanBoard: () => void;
};
export type BoardSlice = { board: BoardStoreRecord } & BoardActions;

export const defaultBoardState: { board: BoardRecord } = {
  board: {
    id: '',
    isPublic: false,
    tiles: [],
    isFixed: false,
    author: '',
    email: '',
    lastEdited: '',
    grid: { rows: 5, columns: 5, order: [] },
    cellSize: '',
  },
};

export const createBoardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BoardSlice
> = (set) => ({
  board: null,
  setBoard: (board: BoardRecord) => set(() => ({ board: { ...board } })),
  cleanBoard: () => {
    // Should show a confirmation dialog
    set(() => ({ board: null }));
  },
});
