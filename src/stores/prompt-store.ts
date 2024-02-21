import { createStore } from 'zustand';

export type PromptState = {
  description: string;
  rows: number;
  columns: number;
  colorScheme: string;
  usePictonizer: boolean;
};

export type PromptActions = {
  setPrompt: (prompt: PromptState) => void;
};

export type PromptStore = PromptState & PromptActions;

export const defaultPromptState: PromptState = {
  description: '',
  rows: 5,
  columns: 5,
  colorScheme: 'fitzgerald',
  usePictonizer: true,
};

export const createPromptStore = (
  initState: PromptState = defaultPromptState,
) =>
  createStore<PromptStore>()((set) => ({
    ...initState,
    setPrompt: (prompt: PromptState) => set(() => ({ ...prompt })),
  }));
