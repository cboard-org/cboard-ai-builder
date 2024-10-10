'use client'; // Check avoid using use optimistic. and use as server component

import { useOptimistic } from 'react';
import { removeSavedBoardsData } from './actions';
import { SavedBoardsData } from './actions';
import DataList from '@/components/DataList/DataList';
import { useEffect } from 'react';
import { startTransition } from 'react';
import { getErrorMessage } from '@/common/common';

type Action =
  | { type: 'ADD_BOARD'; payload: SavedBoardsData }
  | { type: 'DELETE_BOARD'; payload: SavedBoardsData };

export default function SavedBoardsList({
  initialData,
}: {
  initialData: SavedBoardsData[];
}) {
  const [savedBoards, updatesavedBoard] = useOptimistic<
    SavedBoardsData[],
    Action
  >(initialData, (savedBoards, action) => {
    switch (action.type) {
      case 'ADD_BOARD':
        return [action.payload, ...savedBoards];
      case 'DELETE_BOARD':
        return savedBoards.filter((board) => board.id !== action.payload.id);
      default:
        return savedBoards;
    }
  });

  //TODO: Fix this useEffect
  // a hack to update the board list when a new board is added
  // when the first item is deleted the optimisitic update is not working
  useEffect(() => {
    if (
      initialData.length > 0 &&
      savedBoards.length > 0 &&
      initialData[0].id !== savedBoards[0].id
    ) {
      startTransition(() => {
        updatesavedBoard({ type: 'ADD_BOARD', payload: initialData[0] });
      });
    }
  }, [initialData, savedBoards, updatesavedBoard]);

  const deleteSavedBoardsData = async (savedBoardToDelete: SavedBoardsData) => {
    startTransition(async () => {
      updatesavedBoard({ type: 'DELETE_BOARD', payload: savedBoardToDelete });
      try {
        await removeSavedBoardsData(savedBoardToDelete);
      } catch (e) {
        console.error(getErrorMessage(e));
      }
    });
  };

  return (
    <DataList<SavedBoardsData>
      list={savedBoards}
      deleteItem={{ deleteData: deleteSavedBoardsData, isDeleting: false }}
    />
  );
}
