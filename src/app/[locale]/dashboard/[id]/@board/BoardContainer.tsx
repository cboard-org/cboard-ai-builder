'use client';
import Box from '@mui/material/Box';
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
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styles from './styles';
import theme from '@/theme';

const BoardSection = () => {
  const message = useTranslations('Board.BoardContainer');
  const [board, setBoard, prompt] = useBoundStore(
    useShallow((state) => [state.board, state.setBoard, state.prompt]),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
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
    setBoard(newBoard);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Box
          bgcolor={
            isEditing ? theme.palette.primary.light : 'rgb(240, 238, 238);'
          }
          sx={styles.header}
          borderRadius={1}
        >
          <Box>
            {
              <IconButton onClick={handleEditClick}>
                {!isEditing ? (
                  <EditIcon fontSize="small" />
                ) : (
                  <CloseIcon fontSize="small" />
                )}
              </IconButton>
            }
          </Box>
          <Box sx={styles.titleContainer}>
            {/* <Box>Image</Box> */}
            <Box>
              <Typography
                variant="h6"
                fontSize={'1rem'}
                component="div"
                sx={styles.title}
                ml={0.5}
              >
                {prompt.description}
              </Typography>
            </Box>
          </Box>
          <Toolbar isEditing={isEditing} />
        </Box>
        {/* <Divider flexItem sx={{ my: '0.5rem' }} /> */}
        <Grid
          order={board.grid ? board.grid.order : []}
          items={board.tiles}
          columns={board.grid ? board.grid.columns : DEFAULT_COLUMNS_NUMBER}
          rows={board.grid ? board.grid.rows : DEFAULT_ROWS_NUMBER}
          dragAndDropEnabled={isEditing}
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
  const [setBoard, stashedDashboard, hydrated] = useBoundStore(
    useShallow((state) => [
      state.setBoard,
      state.stashedDashboard,
      state.hydrated,
    ]),
  );
  useEffect(() => {
    if (remoteBoard) {
      setBoard(remoteBoard);
    }
  }, [remoteBoard, setBoard]);

  const stashedBoard = stashedDashboard.board;
  const router = useRouter();
  useEffect(() => {
    if (stashedBoard)
      if (id === STASHED_CONTENT_ID) return setBoard(stashedBoard);
    if (id === STASHED_CONTENT_ID && !stashedBoard && hydrated)
      router.push(`/dashboard/${INITIAL_CONTENT_ID}`);
  }, [id, setBoard, stashedBoard, router, hydrated]);

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
    useShallow((state) => [
      state.board,
      state.errorOnBoardGeneration,
      state.setBoard,
    ]),
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
