'use client';
import { createContext, useContext, useRef } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';
import { PromptSlice, createPromptSlice } from '@/stores/prompt-slice';
import { BoardSlice, createBoardSlice } from '@/stores/board-slice';
import { devtools } from 'zustand/middleware';

export type Store = PromptSlice & BoardSlice;
export const StoreContext = createContext<StoreApi<Store> | null>(null);

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    storeRef.current = createStore<Store>()(
      devtools(
        (...props) => ({
          ...createPromptSlice(...props),
          ...createBoardSlice(...props),
        }),
        { name: 'Cboard-AI-builder' },
      ),
    );
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  );
}

export const useBoundStore = <StoreProps,>(
  selector: (store: Store) => StoreProps,
): StoreProps => {
  const storeContext = useContext(StoreContext);

  if (!storeContext) {
    throw new Error(`useStore must be use within StoreProvider`);
  }

  return useStore(storeContext, selector);
};
