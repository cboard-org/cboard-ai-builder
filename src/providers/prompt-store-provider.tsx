'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { type PromptStore, createPromptStore } from '@/stores/prompt-store';

export const PromptStoreContext = createContext<StoreApi<PromptStore> | null>(
  null,
);

export interface PromptStoreProviderProps {
  children: ReactNode;
}

export const PromptStoreProvider = ({ children }: PromptStoreProviderProps) => {
  const storeRef = useRef<StoreApi<PromptStore>>();
  if (!storeRef.current) {
    storeRef.current = createPromptStore();
  }

  return (
    <PromptStoreContext.Provider value={storeRef.current}>
      {children}
    </PromptStoreContext.Provider>
  );
};

export const usePromptStore = <T,>(selector: (store: PromptStore) => T): T => {
  const promptStoreContext = useContext(PromptStoreContext);

  if (!promptStoreContext) {
    throw new Error(`usePromptStore must be use within PromptStoreProvider`);
  }

  return useStore(promptStoreContext, selector);
};
