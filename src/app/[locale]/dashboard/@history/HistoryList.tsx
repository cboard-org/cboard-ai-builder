'use client';

import List from '@mui/material/List';
import { useOptimistic } from 'react';
import DataItem from '@/components/DataItem/DataItem';
import { removeHistoryData } from './actions';
import { HistoryData } from './actions';

export default function HistoryList({
  initialHistories,
}: {
  initialHistories: HistoryData[];
}) {
  const [histories, deleteHistory] = useOptimistic(
    initialHistories,
    (histories, historyToDelete: HistoryData) => {
      return histories.filter((h) => h.id != historyToDelete.id);
    },
  );
  const deleteHistoryData = async (historyToDelete: HistoryData) => {
    deleteHistory(historyToDelete);
    await removeHistoryData(historyToDelete);
  };

  return (
    <List>
      {histories.map((data, index) => (
        <DataItem data={data} key={index} onDelete={deleteHistoryData} />
      ))}
    </List>
  );
}
