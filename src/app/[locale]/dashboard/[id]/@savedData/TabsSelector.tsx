'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = React.useState(
    parseInt(searchParams.get('tab') ?? '0'),
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', newValue.toString());
    router.replace(`${pathname}?${newParams.toString()}`);
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
          <>{history}</>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>{savedBoard}</>
        </TabPanel>
      </Box>
    </Box>
  );
}
