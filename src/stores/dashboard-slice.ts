import { StateCreator } from 'zustand';
import { Store } from './../providers/StoreProvider';

export type DashboardStoreRecord = {
  isGenerationPending: boolean;
};

export type DashboardActions = {
  setGenerationPending: (pending: boolean) => void;
};
export type DashboardSlice = DashboardStoreRecord & DashboardActions;

export const defaultDashboardState: DashboardStoreRecord = {
  isGenerationPending: false,
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
});
