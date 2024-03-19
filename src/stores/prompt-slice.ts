import { StateCreator } from 'zustand';
import { PromptRecord } from '@/commonTypes/Prompt';
import { Store } from './../providers/StoreProvider';

export type PromptActions = {
  setPrompt: (prompt: PromptRecord) => void;
};

export type PromptSlice = { prompt: PromptRecord } & PromptActions;

export const defaultPromptState: PromptRecord = {
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
  setPrompt: (prompt: PromptRecord) =>
    set(() => ({ prompt: { ...prompt } }), false, {
      type: 'Prompt/setPompt',
      prompt,
    }),
});
