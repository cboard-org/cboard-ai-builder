import { StateCreator } from 'zustand';
import { BoardRecord } from '@/commonTypes/Board';
import { Store } from './../providers/StoreProvider';
import { TileRecord } from '@/commonTypes/Tile';

export type BoardStoreRecord = {
  board: BoardRecord | null;
  errorOnBoardGeneration?: boolean;
  boardId?: string;
  isOutdated?: boolean;
};

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: BoardRecord) => void;
  cleanBoard: () => void;
  setErrorOnBoardGeneration: () => void;
  updateTileImage: (
    tileId: string,
    image: string,
    generatedPicto?: TileRecord['generatedPicto'],
  ) => void;
  updateTileProps: (tileId: string, newProps: Partial<TileRecord>) => void;
  setBoardIsUpToDate: () => void;
};
export type BoardSlice = BoardStoreRecord & BoardActions;

export const defaultBoardState: {
  board: null;
  errorOnBoardGeneration: boolean;
  isOutdated?: boolean;
} = {
  board: null,
  errorOnBoardGeneration: false,
  isOutdated: false,
};

export const createBoardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  BoardSlice
> = (set) => ({
  ...defaultBoardState,
  setBoard: (board: BoardRecord) =>
    set(() => ({ board: board, isOutdated: true }), false, {
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
  updateTileImage: (
    tileId: string,
    image: string,
    generatedPicto?: TileRecord['generatedPicto'],
  ) => {
    set(
      (state) => {
        if (!state.board) {
          return state;
        }

        const nextTiles = state.board.tiles.map((tile) =>
          tile.id === tileId
            ? {
                ...tile,
                image: image,
                generatedPicto: generatedPicto ?? tile.generatedPicto,
              }
            : tile,
        );
        return {
          board: { ...state.board, tiles: nextTiles },
          isOutdated: true,
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
  updateTileProps: (tileId: string, newProps: Partial<TileRecord>) => {
    set(
      (state) => {
        if (!state.board) {
          return state;
        }
        const nextTiles = state.board.tiles.map((tile) =>
          tile.id === tileId ? { ...tile, ...newProps } : tile,
        );
        return {
          board: { ...state.board, tiles: nextTiles },
          isOutdated: true,
        };
      },
      false,
      {
        type: 'Board/updateTileProps',
        tileId,
        newProps,
      },
    );
  },
  setBoardIsUpToDate: () => {
    set(() => ({ isOutdated: false }), false, {
      type: 'Board/setBoardIsUpToDate',
    });
  },
});
