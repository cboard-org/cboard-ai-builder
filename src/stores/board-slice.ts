import { StateCreator } from 'zustand';
import { BoardRecord } from '@/dashboard/@board/types';
import { Store } from './../providers/StoreProvider';

export type BoardStoreRecord = {
  board: BoardRecord | null;
  errorOnBoardGeneration?: boolean;
  showInitialContent: boolean;
};

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
  cleanBoard: () => void;
  setErrorOnBoardGeneration: () => void;
  hideInitialBoard: () => void;
};
export type BoardSlice = BoardStoreRecord & BoardActions;

export const defaultBoardState: {
  showInitialContent: boolean;
  board: null;
  errorOnBoardGeneration: boolean;
} = {
  showInitialContent: true,
  board: null,
  errorOnBoardGeneration: false,
};

const CLEAN_BOARD_STATE = { ...defaultBoardState, showInitialContent: false };

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
    set(() => CLEAN_BOARD_STATE, false, {
      type: 'Board/cleanBoard',
    });
  },
  setErrorOnBoardGeneration: () => {
    set(() => ({ errorOnBoardGeneration: true }), false, {
      type: 'Board/setErrorOnBoardGeneration',
    });
  },
  hideInitialBoard: () => {
    set(() => ({ showInitialContent: false }), false, {
      type: 'Board/HideInitialBoard',
    });
  },
});
