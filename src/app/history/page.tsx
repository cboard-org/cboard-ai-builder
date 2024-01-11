import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {/* TODO: internationalization */}
        History
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {historyData.map((h, i) => (
            <HistoryItem history={h} key={i} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
