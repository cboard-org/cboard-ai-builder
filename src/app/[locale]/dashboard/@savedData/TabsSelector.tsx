'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import styles from './styles';
import { Suspense } from 'react';
import Loading from './loading';
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

  return (
    <Box sx={styles.savedDataContainer}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Data selector"
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        sx={styles.tabs}
      >
        <Tab label={translations('history')} />
        <Tab label={translations('savedBoards')} />
      </Tabs>
      <Box sx={styles.tabPanelSection}>
        <TabPanel value={value} index={0}>
          <Suspense fallback={<Loading />}>{history}</Suspense>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Suspense fallback={<Loading />}>{savedBoard}</Suspense>
        </TabPanel>
      </Box>
    </Box>
  );
}
