import { StateCreator } from 'zustand';
import { BoardRecord } from '@/commonTypes/Board';
import { Store } from './../providers/StoreProvider';

export type BoardStoreRecord = {
  board: BoardRecord | null;
  errorOnBoardGeneration?: boolean;
  shouldDisplayInitialContent: boolean;
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
  showInitialContent: () => void;
  changeBoard: (nextBoard: BoardRecord) => void;
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
  changeBoard: (nextBoard: BoardRecord) =>
    set(
      ({ setBoard, cleanBoard }: Store) => {
        cleanBoard();
        setBoard(nextBoard);

        // Update the URL without refreshing the page. Implement when
        // implement this when add the [id] param to the dashboard route
        // const updateURL = () => {
        // const pathname = location.pathname;
        // const newPath = pathname.includes('dashboard/')
        //   ? pathname.replace(/dashboard\/\w+/, `dashboard/${nextBoard.id}`)
        //   : `${pathname}/${nextBoard.id}`;
        //   window.history.pushState(null, '', `${newPath}`);
        // };
        // updateURL();

        return { boardId: nextBoard.id };
      },
      false,
      {
        type: 'Board/changeBoard',
        nextBoard,
      },
    ),
});
