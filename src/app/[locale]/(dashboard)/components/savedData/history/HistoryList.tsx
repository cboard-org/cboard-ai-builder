'use client';

import { removeHistoryData } from './actions';
import { HistoryData } from './actions';
import DataList from '@/components/DataList/DataList';
import { useEffect, useOptimistic } from 'react';
import { startTransition } from 'react';
import { getErrorMessage } from '@/common/common';

type Action =
  | { type: 'ADD_HISTORY'; payload: HistoryData }
  | { type: 'DELETE_HISTORY'; payload: HistoryData };

export default function History({
  initialData,
}: {
  initialData: HistoryData[];
}) {
  const [histories, updateHistories] = useOptimistic<HistoryData[], Action>(
    initialData,
    (histories, action) => {
      switch (action.type) {
        case 'ADD_HISTORY':
          return [action.payload, ...histories];
        case 'DELETE_HISTORY':
          return histories.filter(
            (history) => history.id !== action.payload.id,
          );
        default:
          return histories;
      }
    },
  );
  //TODO: Fix this useEffect
  // a hack to update the history list when a new history is added
  // when the first item is deleted the optimisitic update is not working
  useEffect(() => {
    if (
      initialData.length > 0 &&
      histories.length > 0 &&
      initialData[0].id !== histories[0].id &&
      initialData.length > histories.length
    ) {
      startTransition(() => {
        updateHistories({ type: 'ADD_HISTORY', payload: initialData[0] });
      });
    }
  }, [initialData, histories, updateHistories]);

  const deleteHistoryData = async (historyToDelete: HistoryData) => {
    startTransition(async () => {
      updateHistories({ type: 'DELETE_HISTORY', payload: historyToDelete });
      try {
        await removeHistoryData(historyToDelete.id);
      } catch (e) {
        console.error(getErrorMessage(e));
      }
    });
  };

  return (
    <DataList<HistoryData>
      list={histories}
      deleteItem={{ deleteData: deleteHistoryData, isDeleting: false }}
    />
  );
}
