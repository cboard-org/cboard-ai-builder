'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeHistoryData } from './actions';
import { HistoryData } from './actions';
import DataList from '@/components/DataList/DataList';

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

  return <DataList list={histories} deleteItem={deleteHistoryData} />;
}
