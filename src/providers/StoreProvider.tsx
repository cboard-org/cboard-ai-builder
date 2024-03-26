'use client';
import { createContext, useContext, useRef } from 'react';
import { StoreApi, createStore, useStore } from 'zustand';
import { PromptSlice, createPromptSlice } from '@/stores/prompt-slice';
import { BoardSlice, createBoardSlice } from '@/stores/board-slice';
import { devtools } from 'zustand/middleware';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DashboardSlice, createDashboardSlice } from '@/stores/dashboard-slice';
import { STASHED_CONTENT_ID } from '@/dashboard/constants';

export type Store = PromptSlice & BoardSlice & DashboardSlice;
export const StoreContext = createContext<StoreApi<Store> | null>(null);

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const storeRef = useRef<StoreApi<Store>>();
  if (!storeRef.current) {
    const onRehydrateStorage = ({
      showInitialContent,
      stashDashboard,
      setHydrated,
    }: Store) => {
      return (state: Store | undefined, error: unknown) => {
        if (error) {
          console.error('an error happened during hydration', error);
        } else {
          setHydrated();
          if (state) {
            if (state.dashboardId === STASHED_CONTENT_ID) {
              stashDashboard();
            }
            if (!state?.board) showInitialContent();
          }
        }
      };
    };

    const persistConfig = {
      name: 'Cboard-AI-builder',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: (state: Store) => onRehydrateStorage(state),
    };

    storeRef.current = createStore<Store>()(
      devtools(
        persist(
          (...props) => ({
            ...createPromptSlice(...props),
            ...createBoardSlice(...props),
            ...createDashboardSlice(...props),
          }),
          persistConfig,
        ),
        {
          name: 'Cboard-AI-builder',
        },
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
