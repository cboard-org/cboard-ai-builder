'use client';

import { removeHistoryData } from './actions';
import { HistoryData } from './actions';
import DataList from '@/components/DataList/DataList';
import { useTransition } from 'react';

export default function History({
  initialData: histories,
}: {
  initialData: HistoryData[];
}) {
  const [isPending, startTransition] = useTransition();

  const deleteHistoryData = async (historyToDelete: HistoryData) => {
    startTransition(async () => {
      await removeHistoryData(historyToDelete.id);
    });
  };

  return (
    <DataList<HistoryData>
      list={histories}
      deleteItem={{ deleteData: deleteHistoryData, isDeleting: isPending }}
    />
  );
}
