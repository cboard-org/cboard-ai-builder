import { StateCreator } from 'zustand';
import { BoardRecord } from '@/commonTypes/Board';
import { Store } from './../providers/StoreProvider';

export type BoardStoreRecord = {
  board: BoardRecord | null;
  errorOnBoardGeneration?: boolean;
  boardId?: string;
};

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
  cleanBoard: () => void;
  setErrorOnBoardGeneration: () => void;
  updateTileImage: (tileId: string, image: string) => void;
};
export type BoardSlice = BoardStoreRecord & BoardActions;

export const defaultBoardState: {
  board: null;
  errorOnBoardGeneration: boolean;
} = {
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
  updateTileImage: (tileId: string, image: string) => {
    set(
      (state) => {
        if (!state.board) {
          return state;
        }
        const nextTiles = state.board.tiles.map((tile) =>
          tile.id === tileId ? { ...tile, image: image } : tile,
        );
        return {
          board: { ...state.board, tiles: nextTiles },
        };
      },
      false,
      {
        type: 'Board/updateTileImage',
        tileId,
        image,
      },
    );
  },
});
