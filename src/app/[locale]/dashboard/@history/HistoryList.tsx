'use client';

import List from '@mui/material/List';
import { useOptimistic } from 'react';
import DataItem from '../savedData/DataItem';
import { removeHistoryData } from './actions';

type HistoryData = {
  id: number | string;
  prompt: string;
  date: Date | string;
};

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
        <DataItem<HistoryData>
          data={data}
          key={index}
          onDelete={() => deleteHistoryData(data)}
        />
      ))}
    </List>
  );
}
