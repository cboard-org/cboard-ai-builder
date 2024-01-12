'use client';

import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import { HistoryRow } from './actions';
import HistoryItem from './HistoryItem';
import { useOptimistic } from 'react';

export default function HistoryList({
  initialHistories,
}: {
  initialHistories: HistoryRow[];
}) {
  const [histories, deleteHistory] = useOptimistic(
    initialHistories,
    (histories, historyToDelete: HistoryRow) => {
      return histories.filter((h) => h.id != historyToDelete.id);
    },
  );

  return (
    <AccordionDetails sx={{ maxHeight: 260, overflowY: 'scroll' }}>
      <List>
        {histories.map((h, i) => (
          <HistoryItem history={h} key={i} onDelete={deleteHistory} />
        ))}
      </List>
    </AccordionDetails>
  );
}
