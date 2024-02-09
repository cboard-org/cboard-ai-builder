'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeSavedBoardsData } from './actions';
import { SavedBoardsData } from './actions';
import DataList from '@/components/DataList/DataList';

export default function SavedBoardsList({
  initialData,
}: {
  initialData: SavedBoardsData[];
}) {
  const [histories, deleteHistory] = useOptimistic(
    initialData,
    (histories, historyToDelete: SavedBoardsData) => {
      return histories.filter((h) => h.id != historyToDelete.id);
    },
  );
  const deleteSavedBoardsData = async (historyToDelete: SavedBoardsData) => {
    deleteHistory(historyToDelete);
    await removeSavedBoardsData(historyToDelete);
  };

  return <DataList list={histories} deleteItem={deleteSavedBoardsData} />;
}
