'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeHistoryData } from './actions';
import { HistoryData } from './actions';
import DataList from '@/components/DataList/DataList';
import { getHistoryData } from './actions';
import usePagination from '@/hooks/usePagination';

export default function HistoryList({
  initialHistories,
  initialPagination,
}: {
  initialHistories: HistoryData[];
  initialPagination: {
    totalPages: number;
    totalItems: number;
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

  const { handleChange, items } = usePagination<HistoryData>(
    histories,
    initialPagination,
    getHistoryData,
  );

  const deleteHistoryData = async (historyToDelete: HistoryData) => {
    deleteHistory(historyToDelete);
    await removeHistoryData(historyToDelete);
  };

  return (
    <DataList<HistoryData>
      list={items}
      deleteItem={deleteHistoryData}
      pagination={{
        totalPages: initialPagination.totalPages,
        initialPage: initialPagination.actualPage,
        itemsPerPage: initialPagination.itemsPerPage,
      }}
      handleChange={handleChange}
    />
  );
}
