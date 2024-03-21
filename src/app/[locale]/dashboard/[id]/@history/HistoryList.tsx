'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeHistoryData } from './actions';
import { HistoryData } from './actions';
import DataList from '@/components/DataList/DataList';
import { getHistoryData } from './actions';

export default function HistoryList({
  initialHistories,
  pagination,
}: {
  initialHistories: HistoryData[];
  pagination: {
    totalPages: number;
    actualPage: number;
    itemsPerPage: number;
    totalRetrievedPages: number;
  };
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
    <DataList<HistoryData>
      list={histories}
      deleteItem={deleteHistoryData}
      pagination={pagination}
      fetchItems={getHistoryData}
    />
  );
}
