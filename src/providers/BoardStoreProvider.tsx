'use client';

import { createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { type BoardStore, createBoardStore } from '@/stores/board-store';

export const BoardStoreContext = createContext<StoreApi<BoardStore> | null>(
  null,
);

export const BoardStoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreApi<BoardStore>>();
  if (!storeRef.current) {
    storeRef.current = createBoardStore();
  }

  return (
    <BoardStoreContext.Provider value={storeRef.current}>
      {children}
    </BoardStoreContext.Provider>
  );
};

export const useBoardStore = <BoardStoreProps,>(
  selector: (store: BoardStore) => BoardStoreProps,
): BoardStoreProps => {
  const boardStoreContext = useContext(BoardStoreContext);

  if (!boardStoreContext) {
    throw new Error(`usePromptStore must be use within PromptStoreProvider`);
  }

  return useStore(boardStoreContext, selector);
};
