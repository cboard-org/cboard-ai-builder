import { StateCreator } from 'zustand';
import { Store } from './../providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { BoardRecord } from '@/commonTypes/Board';

export type DashboardStoreRecord = {
  isGenerationPending: boolean;
  dashboardId: string;
  stashedDashboard: {
    id: string;
    prompt: PromptRecord | null;
    board: BoardRecord | null;
  };
};

export type DashboardActions = {
  setGenerationPending: (pending: boolean) => void;
  setDashboardId: (id: string) => void;
  stashDashboard: () => void;
};
export type DashboardSlice = DashboardStoreRecord & DashboardActions;

export const defaultDashboardState: DashboardStoreRecord = {
  isGenerationPending: false,
  dashboardId: 'create',
  stashedDashboard: {
    id: 'new',
    prompt: null,
    board: null,
  },
};

export const createDashboardSlice: StateCreator<
  Store,
  [['zustand/devtools', never]],
  [],
  DashboardSlice
> = (set) => ({
  ...defaultDashboardState,
  setGenerationPending: (pending: boolean) => {
    set(() => ({ isGenerationPending: pending }), false, {
      type: 'Dashboard/setPending',
      pending,
    });
  },
  setDashboardId: (id: string) => {
    set(() => ({ dashboardId: id }), false, {
      type: 'Dashboard/setId',
      id,
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
});
