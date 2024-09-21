import { StateCreator } from 'zustand';
import { Store } from './../providers/StoreProvider';
import { PromptRecord } from '@/commonTypes/Prompt';
import { BoardRecord } from '@/commonTypes/Board';

type DashboardRecord = {
  id: string;
  prompt: PromptRecord | null;
  board: BoardRecord | null;
};

export type DashboardStoreRecord = {
  hydrated: boolean;
  isGenerationPending: boolean;
  stashedDashboard: DashboardRecord;
  isSidebarOpen: boolean;
};

export type DashboardActions = {
  setHydrated: () => void;
  setGenerationPending: (pending: boolean) => void;
  stashDashboard: () => void;
  toogleIsSidebarOpen: () => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
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
  isSidebarOpen: false,
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
  toogleIsSidebarOpen: () => {
    set(
      ({ isSidebarOpen }) => ({
        isSidebarOpen: !isSidebarOpen,
      }),
      false,
      {
        type: 'Dashboard/toggleIsSidebarOpen',
      },
    );
  },
  setIsSidebarOpen: (isOpen: boolean) => {
    set(
      () => ({
        isSidebarOpen: isOpen,
      }),
      false,
      {
        type: 'Dashboard/setIsSidebarOpen',
      },
    );
  },
});
