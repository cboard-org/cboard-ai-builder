'use client';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Grid from './Grid';
import board from './Grid/testBoard.json';
import { ReactNode } from 'react';

export default function Board() {
  const renderTileFixedBoard = (item: {
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
        <Box sx={{ fontSize: '2rem', color: 'white' }}>{item.label}</Box>
      </Box>
    );
  };

  const onTileDrop = () =>
    // item: { id: string | number },
    // position: { row: number; column: number },
    {};

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
          <Box sx={{ display: 'flex' }}>
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <DownloadIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <PrintIcon fontSize="small" />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <BookmarkBorderIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
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
