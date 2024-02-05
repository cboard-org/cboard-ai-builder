'use client';

import List from '@mui/material/List';
import { DataRow } from '../savedData/types';
import HistoryItem from './HistoryItem';
import { useOptimistic } from 'react';
import DataItem from '../savedData/DataItem';
import { removeHistoryData } from './actions';

export default function HistoryList({
  initialHistories,
}: {
  initialHistories: DataRow[];
}) {
  const [histories, deleteHistory] = useOptimistic(
    initialHistories,
    (histories, historyToDelete: DataRow) => {
      return histories.filter((h) => h.id != historyToDelete.id);
    },
  );
  const deleteHistoryData = async (historyToDelete: DataRow) => {
    deleteHistory(historyToDelete);
    await removeHistoryData(historyToDelete);
  };

  return (
    <List>
      {histories.map((data, index) => (
        <DataItem
          data={data}
          key={index}
          onDelete={() => deleteHistoryData(data)}
        />
      ))}
    </List>
  );
}
