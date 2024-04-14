'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import Grid from './Grid';
import React, { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { moveOrderItem } from './Grid/gridManipulation';
import { BoardRecord } from '@/commonTypes/Board';
import { useTranslations } from 'next-intl';
import { DEFAULT_COLUMNS_NUMBER, DEFAULT_ROWS_NUMBER } from './constants';
import Tile from '@/components/Tile';
import SelectTileMask from '@/components/SelectTileMask';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '../constants';
import { useRouter } from '@/navigation';
import useSaveOnSetBoard from './useSaveOnSetBoard';

const BoardSection = () => {
  const message = useTranslations('Board.BoardContainer');
  const [board] = useBoundStore(
    useShallow((state) => [state.board, state.setBoard]),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [updateBoard, isSaving] = useSaveOnSetBoard();
  if (!board) return null;
  const handleEditClick = () => {
    setIsEditing((isEditing) => !isEditing);
    setSelectedTiles([]);
  };

  const handleTileClick = (id: string) => {
    if (!isEditing) return;

    setSelectedTiles((selectedTiles) =>
      selectedTiles.includes(id)
        ? selectedTiles.filter((tileId) => tileId !== id)
        : [...selectedTiles, id],
    );
  };

  const onTileDrop = (
    item: { id: string },
    position: { row: number; column: number },
  ) => {
    const newOrder = moveOrderItem(item.id, position, board.grid.order);
    const newBoard: BoardRecord = {
      ...board,
      grid: {
        ...board.grid,
        order: newOrder,
      },
    };
    updateBoard(newBoard);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: '.5rem',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            height: '12%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box>Image</Box>
            <Box>| Board title</Box>
          </Box>
          <Toolbar onEditClick={handleEditClick} isSavingChange={isSaving} />
        </Box>
        <Divider flexItem sx={{ my: '0.5rem' }} />
        <Grid
          order={board.grid ? board.grid.order : []}
          items={board.tiles}
          columns={board.grid ? board.grid.columns : DEFAULT_COLUMNS_NUMBER}
          rows={board.grid ? board.grid.rows : DEFAULT_ROWS_NUMBER}
          dragAndDropEnabled={true} //{isSelecting}
          renderItem={(item) => (
            <Tile tile={item} handleTileClick={handleTileClick}>
              {isEditing && (
                <SelectTileMask isSelected={selectedTiles.includes(item.id)} />
              )}
            </Tile>
          )}
          onItemDrop={onTileDrop}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          pt: { xs: '0.5rem', sm: 0 },
          pr: { xs: 1, sm: 1 },
          pb: { xs: 1, sm: 1 },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<NorthEast />}
          sx={{ fontSize: '0.7rem' }}
        >
          {message('exportToCboard')}
        </Button>
      </Box>
    </>
  );
};

const useSetInitialBoard = ({
  remoteBoard,
  id,
}: {
  remoteBoard: BoardRecord | null;
  id: string;
}) => {
  const [setBoard, stashedDashboard, hydrated, setBoardIsUpToDate, setPrompt] =
    useBoundStore(
      useShallow((state) => [
        state.setBoard,
        state.stashedDashboard,
        state.hydrated,
        state.setBoardIsUpToDate,
        state.setPrompt,
      ]),
    );
  useEffect(() => {
    if (remoteBoard) {
      setBoard(remoteBoard);
      setBoardIsUpToDate();
    }
  }, [remoteBoard, setBoard, setBoardIsUpToDate]);

  const stashedBoard = stashedDashboard.board;
  const stashedPrompt = stashedDashboard.prompt;

  const router = useRouter();
  useEffect(() => {
    if (stashedBoard && stashedPrompt && id === STASHED_CONTENT_ID) {
      setBoard(stashedBoard);
      setPrompt(stashedPrompt);
      return;
    }
    if (id === STASHED_CONTENT_ID && !stashedBoard && hydrated)
      router.push(`/dashboard/${INITIAL_CONTENT_ID}`);
  }, [id, setBoard, stashedBoard, router, hydrated, stashedPrompt, setPrompt]);

  return;
};
export default function BoardContainer({
  id,
  remoteBoard,
}: {
  id: string;
  remoteBoard: BoardRecord | null;
}) {
  // should use board from store as truth
  const [boardFromStore, errorOnBoardGeneration] = useBoundStore(
    useShallow((state) => [state.board, state.errorOnBoardGeneration]),
  );

  useSetInitialBoard({ remoteBoard, id });

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
      }}
    >
      {boardFromStore && <BoardSection />}
      {!boardFromStore && (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {errorOnBoardGeneration ? (
            <p style={{ color: 'red' }}>ERROR!</p>
          ) : (
            <p>LOADING...</p>
          )}
        </Box>
      )}
    </Box>
  );
}
