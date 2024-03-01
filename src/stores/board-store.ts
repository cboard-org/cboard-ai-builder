import { createStore } from 'zustand';
import { BoardRecord } from '@/dashboard/@board/types';

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
  createStore<BoardStore>()((set) => ({
    ...initState,
    setBoard: (board: BoardRecord) => set(() => ({ ...board })),
  }));
