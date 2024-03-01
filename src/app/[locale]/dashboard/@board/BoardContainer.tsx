'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import Grid from './Grid';
import testBoard from './testBoard.json';
import React, { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { moveOrderItem } from './Grid/gridManipulation';
import { BoardRecord } from './types';
import { useTranslations } from 'next-intl';
import { DEFAULT_COLUMNS_NUMBER, DEFAULT_ROWS_NUMBER } from './constants';
import Tile from '@/components/Tile';
import SelectTileMask from '@/components/SelectTileMask';
import { useBoardStore } from '@/providers/BoardStoreProvider';

export default function BoardContainer() {
  const message = useTranslations('Board.BoardContainer');
  const [board, setBoard] = useState<BoardRecord>(testBoard[1]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const { board: boardFromStore } = useBoardStore((state) => state);

  useEffect(() => {
    setBoard(boardFromStore);
  }, [boardFromStore]);

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
    setBoard(newBoard);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: '.5rem',
          backgroundColor: '#f8f8f8',
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
          <Toolbar onEditClick={handleEditClick} />
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
          pt: '0.5rem',
          pb: { xs: '0.5rem', sm: '0' },
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          startIcon={<NorthEast />}
          sx={{ fontSize: '0.7rem' }}
        >
          {message('exportToCboard')}
        </Button>
      </Box>
    </Box>
  );
}
