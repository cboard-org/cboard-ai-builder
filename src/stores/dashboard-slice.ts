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
  dashboardId: string;
  stashedDashboard: DashboardRecord;
};

export type DashboardActions = {
  setHydrated: () => void;
  setGenerationPending: (pending: boolean) => void;
  setDashboardId: (id: string) => void;
  setDashboard: (dashboard: DashboardRecord) => void;
  stashDashboard: () => void;
  changeDashboard: ({
    nextBoard,
    nextDashboardId,
  }: {
    nextBoard?: BoardRecord;
    nextDashboardId: string;
  }) => void;
};
export type DashboardSlice = DashboardStoreRecord & DashboardActions;

export const defaultDashboardState: DashboardStoreRecord = {
  hydrated: false,
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
  setDashboardId: (id: string) => {
    set(() => ({ dashboardId: id }), false, {
      type: 'Dashboard/setId',
      id,
    });
  },
  setDashboard: (dashboard: DashboardRecord) => {
    set(
      ({ setBoard, setPrompt }) => {
        if (dashboard.board) setBoard(dashboard.board);
        if (dashboard.prompt) setPrompt(dashboard.prompt);
        return { dashboardId: dashboard.id };
      },
      false,
      {
        type: 'Dashboard/set',
        dashboard,
      },
    );
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
  changeDashboard: ({
    nextBoard,
    nextDashboardId,
  }: {
    nextBoard?: BoardRecord;
    nextDashboardId: string;
  }) =>
    set(
      ({ setBoard, cleanBoard }: Store) => {
        cleanBoard();
        if (nextBoard) setBoard(nextBoard);

        // Update the URL without refreshing the page.
        const updateURL = () => {
          const pathname = location.pathname;
          const newPath = pathname.includes('dashboard/')
            ? pathname.replace(/dashboard\/\w+/, `dashboard/${nextDashboardId}`)
            : `${pathname}/${nextDashboardId}`;
          window.history.pushState(null, '', `${newPath}`);
        };
        updateURL();
        return { dashboardId: nextDashboardId };
      },
      false,
      {
        type: 'Dashboard/change',
        nextBoard,
      },
    ),
});
