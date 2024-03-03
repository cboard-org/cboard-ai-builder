import { createStore } from 'zustand';
import { Prompt } from '@/app/[locale]/dashboard/types';
import { devtools } from 'zustand/middleware';

export type PromptActions = {
  setPrompt: (prompt: Prompt) => void;
};

export type PromptStore = Prompt & PromptActions;

export const defaultPromptState: Prompt = {
  description: '',
  rows: 5,
  columns: 5,
  colorScheme: 'fitzgerald',
  shouldUsePictonizer: true,
};

export const createPromptStore = (initState: Prompt = defaultPromptState) =>
  createStore<PromptStore>()(
    devtools((set) => ({
      ...initState,
      setPrompt: (prompt: Prompt) =>
        set(() => ({ ...prompt }), false, { type: 'Prompt/setPompt', prompt }),
    })),
  );
