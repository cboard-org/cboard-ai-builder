import { createStore } from 'zustand';
import { Board } from '@/app/[locale]/dashboard/types';

export type BoardActions = {
  /*
  See how to update deeply nested objects 
  for tile in zustand: https://docs.pmnd.rs/zustand/guides/updating-state#deeply-nested-object
  */
  setBoard: (board: Board) => void;
};

export type BoardStore = Board & BoardActions;

export const defaultBoardState: Board = {
  id: '',
  name: '',
  tiles: [],
};

export const createBoardStore = (initState: Board = defaultBoardState) =>
  createStore<BoardStore>()((set) => ({
    ...initState,
    setBoard: (board: Board) => set(() => ({ ...board })),
  }));
