import { StateCreator } from 'zustand';
import { Store } from './../providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { BoardRecord } from '@/commonTypes/Board';

type DashboardRecord = {
  id: string;
  prompt: PromptRecord | null;
  board: BoardRecord | null;
};

type ColorTheme = 'auto' | 'dark' | 'light';

export type DashboardStoreRecord = {
  hydrated: boolean;
  isGenerationPending: boolean;
  stashedDashboard: DashboardRecord;
  theme: ColorTheme;
};

export type DashboardActions = {
  setHydrated: () => void;
  setGenerationPending: (pending: boolean) => void;
  stashDashboard: () => void;
  setTheme: (theme: ColorTheme) => void;
};
export type DashboardSlice = DashboardStoreRecord & DashboardActions;

export const defaultDashboardState: DashboardStoreRecord = {
  hydrated: false,
  isGenerationPending: false,
  stashedDashboard: {
    id: 'new',
    prompt: null,
    board: null,
  },
  theme: 'dark',
};

export const createDashboardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  DashboardSlice
> = (set) => ({
  ...defaultDashboardState,
  setHydrated: () => {
    set(() => ({ hydrated: true }), false, {
      type: 'Dashboard/setHydrated',
    });
  },
  setGenerationPending: (pending: boolean) => {
    set(() => ({ isGenerationPending: pending }), false, {
      type: 'Dashboard/setPending',
      pending,
    });
  },
  stashDashboard: () => {
    set(
      ({ prompt, board }) => ({
        stashedDashboard: { id: 'new', prompt, board },
      }),
      false,
      {
        type: 'Dashboard/stash',
      },
    );
  },
  setTheme: (theme: ColorTheme) => {
    set(() => ({ theme }), false, {
      type: 'Dashboard/setTheme',
    });
  },
});
