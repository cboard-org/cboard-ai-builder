'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeSavedBoardsData } from './actions';
import { SavedBoardsData } from './actions';
import DataList from '@/components/DataList/DataList';

export default function SavedBoardsList({
  initialData,
  onEditClick,
}: {
  initialData: SavedBoardsData[];
  onEditClick: () => void;
}) {
  const [savedBoards, deletesavedBoard] = useOptimistic(
    initialData,
    (savedBoards, savedBoardToDelete: SavedBoardsData) => {
      return savedBoards.filter((board) => board.id != savedBoardToDelete.id);
    },
  );
  const deleteSavedBoardsData = async (savedBoardToDelete: SavedBoardsData) => {
    deletesavedBoard(savedBoardToDelete);
    await removeSavedBoardsData(savedBoardToDelete);
  };

  return (
    <DataList<SavedBoardsData>
      list={savedBoards}
      deleteItem={deleteSavedBoardsData}
      onEditClick={onEditClick}
    />
  );
}
