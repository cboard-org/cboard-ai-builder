'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import SavedBoardsList from '../savedBoards/SavedBoardList';
import { SavedBoardsData } from '../savedBoards/actions';
import { HistoryData } from '../history/actions';
import History from '../history/History';

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

export default function TabsSelector({
  initialHistory,
  initialSavedBoards,
}: {
  initialHistory: HistoryData[];
  initialSavedBoards: SavedBoardsData[];
}) {
  const translations = useTranslations('SavedData');

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <History initialData={initialHistory} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SavedBoardsList initialData={initialSavedBoards} />
        </TabPanel>
      </Box>
    </Box>
  );
}
