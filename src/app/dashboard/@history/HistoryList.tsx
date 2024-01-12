'use client';

import { AccordionDetails, List } from '@mui/material';
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
    <AccordionDetails>
      <List>
        {histories.map((h, i) => (
          <HistoryItem history={h} key={i} onDelete={deleteHistory} />
        ))}
      </List>
    </AccordionDetails>
  );
}
