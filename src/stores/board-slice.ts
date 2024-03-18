import { StateCreator } from 'zustand';
import { BoardRecord } from '@/commonTypes/Board';
import { Store } from './../providers/StoreProvider';

export type BoardStoreRecord = {
  board: BoardRecord | null;
  errorOnBoardGeneration?: boolean;
  shouldDisplayInitialContent: boolean;
};

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
  cleanBoard: () => void;
  setErrorOnBoardGeneration: () => void;
  showInitialContent: () => void;
};
export type BoardSlice = BoardStoreRecord & BoardActions;

export const defaultBoardState: {
  shouldDisplayInitialContent: boolean;
  board: null;
  errorOnBoardGeneration: boolean;
} = {
  shouldDisplayInitialContent: false,
  board: null,
  errorOnBoardGeneration: false,
};

export const createBoardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BoardSlice
> = (set) => ({
  ...defaultBoardState,
  setBoard: (board: BoardRecord) =>
    set(() => ({ board: board }), false, {
      type: 'Board/setBoard',
      board,
    }),
  cleanBoard: () => {
    // Should show a confirmation dialog
    set(() => defaultBoardState, false, {
      type: 'Board/cleanBoard',
    });
  },
  setErrorOnBoardGeneration: () => {
    set(() => ({ errorOnBoardGeneration: true }), false, {
      type: 'Board/setErrorOnBoardGeneration',
    });
  },
  showInitialContent: () => {
    set(() => ({ shouldDisplayInitialContent: true }), false, {
      type: 'Board/showInitialContent',
    });
  },
});
