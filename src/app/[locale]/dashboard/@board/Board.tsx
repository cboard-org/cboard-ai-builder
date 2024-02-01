'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import Grid from './Grid';
import testBoard from './testBoard.json';
import React, { ReactNode, useState } from 'react';
import BoardToolbar from './BoardToolbar';
import { moveOrderItem } from './Grid/gridManipulation';
import { BoardRecord } from './types';

const renderTileFixedBoard = (item: {
  id: string;
  color: string;
  label: string;
  backgroundColor: string;
}): ReactNode => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: item.backgroundColor,
        borderRadius: '0.5rem',
        border: '1px solid #ccc',
        boxShadow: '0 0 5px #ccc',
      }}
    >
      <Box sx={{ fontSize: '0.5rem', color: 'black' }}>{item.id}L</Box>
    </Box>
  );
};

export default function Board() {
  const [board, setBoard] = useState<BoardRecord>(testBoard[0]);

  const onTileDrop = (
    item: { id: string },
    position: { row: number; column: number },
  ) => {
    console.log(item);
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
        }}
      >
        <BoardToolbar />
        <Divider flexItem sx={{ my: '0.5rem' }} />
        <Grid
          order={board.grid ? board.grid.order : []}
          items={board.tiles}
          columns={board.grid ? board.grid.columns : 6} //DEFAULT_COLUMNS_NUMBER}
          rows={board.grid ? board.grid.rows : 6} // DEFAULT_ROWS_NUMBER}
          dragAndDropEnabled={true} //{isSelecting}
          renderItem={(item) => renderTileFixedBoard(item)}
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
          Export to Cboard
        </Button>
      </Box>
    </Box>
  );
}
