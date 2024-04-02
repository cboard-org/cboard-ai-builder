'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import { SavedBoardsData } from '../savedBoards/actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect } from 'react';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '@/dashboard/constants';
import { useShallow } from 'zustand/react/shallow';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const useSetDashboardOnDashboardIdChange = (
  savedDashboards: SavedBoardsData[],
  preventSetBoardOnDashboardIdChange: React.MutableRefObject<boolean>,
) => {
  const [
    stashedDashboard,
    setDashboard,
    dashboardId,
    hydrated,
    showInitialContent,
  ] = useBoundStore(
    useShallow((state) => [
      state.stashedDashboard,
      state.setDashboard,
      state.dashboardId,
      state.hydrated,
      state.showInitialContent,
    ]),
  );
  useEffect(() => {
    if (hydrated) {
      if (!preventSetBoardOnDashboardIdChange.current) {
        if (
          dashboardId === STASHED_CONTENT_ID &&
          stashedDashboard.board &&
          stashedDashboard.prompt
        ) {
          return setDashboard(stashedDashboard);
        }
        if (dashboardId === INITIAL_CONTENT_ID) return showInitialContent();

        if (dashboardId !== STASHED_CONTENT_ID) {
          const nextDashboard = savedDashboards.find(
            (dashboard) => dashboard.id === dashboardId,
          );
          if (nextDashboard) {
            return setDashboard(nextDashboard);
          }
          console.error('board not found');
        }
      }
      preventSetBoardOnDashboardIdChange.current = false;
    }
  }, [
    dashboardId,
    setDashboard,
    stashedDashboard,
    savedDashboards,
    hydrated,
    preventSetBoardOnDashboardIdChange,
    showInitialContent,
  ]);
};

export default function TabsSelector({
  history,
  savedBoard,
}: {
  history: React.ReactNode;
  savedBoard: React.ReactNode;
}) {
  const translations = useTranslations('SavedData');

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const preventSetBoardOnDashboardIdChange = React.useRef(true);

  useSetDashboardOnDashboardIdChange([], preventSetBoardOnDashboardIdChange);

  return (
    <Box px={2}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Data selector"
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label={translations('history')} />
        <Tab label={translations('savedBoards')} />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          <>{history}</>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>{savedBoard}</>
        </TabPanel>
      </Box>
    </Box>
  );
}
