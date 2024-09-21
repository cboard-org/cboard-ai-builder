'use client';
import Box from '@mui/material/Box';
import Grid from './Grid';
import React, { useEffect, useState } from 'react';
import Toolbar from './Toolbar';
import { moveOrderItem } from './Grid/gridManipulation';
import { BoardRecord } from '@/commonTypes/Board';
import { DEFAULT_COLUMNS_NUMBER, DEFAULT_ROWS_NUMBER } from './constants';
import Tile from '@/components/Tile';
// import SelectTileMask from '@/components/SelectTileMask';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '../../../constants';
import { useRouter } from '@/navigation';
import useSaveOnSetBoard from '../hooks/useSaveOnSetBoard';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import styles from './styles';
import ExportToCboard from '@/components/ExportToCboard/ExportToCboard';

const BoardSection = () => {
  const [board, prompt] = useBoundStore(
    useShallow((state) => [state.board, state.prompt]),
  );
  const [isEditing, setIsEditing] = useState(false);
  //const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [updateBoard, isSaving] = useSaveOnSetBoard();
  if (!board) return null;
  const handleEditClick = () => {
    setIsEditing((isEditing) => !isEditing);
    //setSelectedTiles([]);
  };

  const handleTileClick = () => {
    if (!isEditing) {
      return;
    }

    // setSelectedTiles((selectedTiles) =>
    //   selectedTiles.includes(id)
    //     ? selectedTiles.filter((tileId) => tileId !== id)
    //     : [...selectedTiles, id],
    // );
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        bgcolor={
          isEditing
            ? (theme) => theme.palette.primary.light
            : (theme) => theme.palette.grey[100]
        }
        sx={styles.header}
      >
        <Box pr={2}>
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
        <Typography
          variant="h6"
          fontSize={'1rem'}
          component="span"
          sx={styles.title}
          ml={0.5}
        >
          {prompt.description}
        </Typography>
        <Toolbar isEditing={isEditing} isSavingChange={isSaving} />
      </Box>
      <Box sx={styles.boardGridContainer} className={'print-section'}>
        <Box
          className="print-title"
          sx={{ ...styles.printTitle, ...styles.title }}
        >
          {prompt.description}
        </Box>
        <Grid
          order={board.grid ? board.grid.order : []}
          items={board.tiles}
          columns={board.grid ? board.grid.columns : DEFAULT_COLUMNS_NUMBER}
          rows={board.grid ? board.grid.rows : DEFAULT_ROWS_NUMBER}
          dragAndDropEnabled={isEditing}
          renderItem={(item) => (
            <Tile
              tile={item}
              handleTileClick={handleTileClick}
              isEditionView={isEditing}
            >
              {/* {isEditing && (
                <SelectTileMask isSelected={selectedTiles.includes(item.id)} />
              )} */}
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
          flexShrink: 0,
          pr: { xs: 1, sm: 1 },
          py: { xs: 1, sm: 1 },
        }}
      >
        <ExportToCboard />
      </Box>
    </Box>
  );
};

const useSetInitialBoard = ({
  remoteBoard,
  id,
}: {
  remoteBoard: BoardRecord | null;
  id: string;
}) => {
  const [
    setBoard,
    stashedDashboard,
    hydrated,
    setBoardIsUpToDate,
    setGenerationPending,
    setPrompt,
  ] = useBoundStore(
    useShallow((state) => [
      state.setBoard,
      state.stashedDashboard,
      state.hydrated,
      state.setBoardIsUpToDate,
      state.setGenerationPending,
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
      setGenerationPending(false);
      return;
    }
    if (id === STASHED_CONTENT_ID && !stashedBoard && hydrated)
      router.push(`/board/${INITIAL_CONTENT_ID}`);
  }, [
    id,
    setBoard,
    stashedBoard,
    router,
    hydrated,
    stashedPrompt,
    setPrompt,
    setGenerationPending,
  ]);

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
