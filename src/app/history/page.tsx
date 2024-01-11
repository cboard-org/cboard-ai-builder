import { AccordionDetails, List } from '@mui/material';
import HistoryItem from './HistoryItem';

export type HistoryRow = {
  prompt: string;
  date: Date | string;
};
async function getHistoryData() {
  // Fetching with a 2 seconds delay to test loading state
  await fetch('https://postman-echo.com/delay/2', {
    cache: 'no-cache',
  });
  // Here we query DB
  return [
    {
      prompt: 'Little family in a camp with a cup',
      date: 'Yesterday',
    },
    {
      prompt: 'Little family in a camp with a cup',
      date: 'Yesterday',
    },
    {
      prompt: 'Little family in a camp with a cup',
      date: 'Yesterday',
    },
  ];
}

export default async function Page() {
  const historyData = await getHistoryData();
  return (
    <AccordionDetails>
      <List>
        {historyData.map((h, i) => (
          <HistoryItem history={h} key={i} />
        ))}
      </List>
    </AccordionDetails>
  );
}
