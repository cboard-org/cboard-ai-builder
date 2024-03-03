import { StateCreator } from 'zustand';
import { Prompt } from '@/app/[locale]/dashboard/types';
import { Store } from './../providers/StoreProvider';

export type PromptActions = {
  setPrompt: (prompt: Prompt) => void;
};

export type PromptSlice = { prompt: Prompt } & PromptActions;

export const defaultPromptState: Prompt = {
  description: '',
  rows: 5,
  columns: 5,
  colorScheme: 'fitzgerald',
  shouldUsePictonizer: true,
};

export const createPromptSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  PromptSlice
> = (set) => ({
  //check this initstate = defaultPromptState
  prompt: { ...defaultPromptState },
  setPrompt: (prompt: Prompt) =>
    set(() => ({ prompt: { ...prompt } }), false, {
      type: 'Prompt/setPompt',
      prompt,
    }),
});
