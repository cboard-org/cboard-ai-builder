'use client';

import { createContext, useRef, useContext } from 'react';
import { type StoreApi, useStore } from 'zustand';

import { type PromptStore, createPromptStore } from '@/stores/prompt-store';

export const PromptStoreContext = createContext<StoreApi<PromptStore> | null>(
  null,
);

export const PromptStoreProvider = ({ children }: React.PropsWithChildren) => {
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

export const usePromptStore = <PromptStoreProps,>(
  selector: (store: PromptStore) => PromptStoreProps,
): PromptStoreProps => {
  const promptStoreContext = useContext(PromptStoreContext);

  if (!promptStoreContext) {
    throw new Error(`usePromptStore must be use within PromptStoreProvider`);
  }

  return useStore(promptStoreContext, selector);
};
