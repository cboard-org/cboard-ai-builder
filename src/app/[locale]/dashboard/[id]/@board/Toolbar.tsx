import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { BoardRecord } from '@/commonTypes/Board';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';
// import EditingToolbar from './EditingToolbar';
import styles from './styles';
import { cboardExportAdapter } from '@/lib/exportHelpers/cboardExportAdapter';
import { getErrorMessage } from '@/common/common';
import { useUpsertActualBoard } from '../hooks/useUpsertActualBoard';

type Props = {
  isEditing: boolean;
  isSavingChange: boolean;
};

export default function Toolbar({ isEditing, isSavingChange }: Props) {
  const { isSaving, isNewBoard, upsertBoard } = useUpsertActualBoard();

  const onSaveBoard = async (board: BoardRecord) => {
    await upsertBoard(board);
  };

  const [board, isOutdated] = useBoundStore(
    useShallow((state) => [state.board, state.isOutdated]),
  );

  const theme = useTheme();

  if (!board) return null;

  const isBoardOutdated = isOutdated || isNewBoard;

  return (
    <Box sx={styles.toolbar}>
      {!isEditing ? <DefaultToolbar /> : <></>}
      {/* <EditingToolbar />} */}

      <Divider orientation="vertical" flexItem />
      <IconButton
        disabled={isSavingChange || isSaving || !isBoardOutdated}
        onClick={() => onSaveBoard(board)}
        color={'error'}
        sx={{
          '&.Mui-disabled': {
            color: theme.palette.success.main,
          },
        }}
      >
        {isOutdated === null || isSavingChange || isSaving ? (
          <CircularProgress size={20} />
        ) : isBoardOutdated ? (
          <BookmarkIcon fontSize="small" />
        ) : (
          <BookmarkAddedIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}

const useDownloadBoard = (): [() => Promise<void>, boolean] => {
  const board = useBoundStore((state) => state.board);
  const [isDownloadingBoard, setIsDownloadingBoard] = useState(false);

  const handleDownloadClick = async () => {
    setIsDownloadingBoard(true);
    try {
      if (board) await cboardExportAdapter([board]);
    } catch (error) {
      console.error(getErrorMessage(error));
      //Show Error Notification
    }
    setIsDownloadingBoard(false);
  };

  return [handleDownloadClick, isDownloadingBoard];
};

const DefaultToolbar = () => {
  const handlePrint = () => {
    document.body.classList.add('print-mode');
    window.print();
    document.body.classList.remove('print-mode');
  };
  // const [isFullscreen, setisFullscreen] = useState(false);
  // const toggleFullscreen = () => {
  //   if (!document.fullscreenElement) {
  //     //if not fullscreen
  //     document.documentElement.requestFullscreen();
  //     setisFullscreen(true);
  //   } else {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //       setisFullscreen(false);
  //     }
  //   }
  // };
  const [handleDownloadClick, isDownloadingBoard] = useDownloadBoard();

  return (
    <>
      {/* <IconButton onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <IconButton>
        <EditIcon fontSize="small" />
      </IconButton> */}
      <IconButton onClick={handleDownloadClick} disabled={isDownloadingBoard}>
        {isDownloadingBoard ? (
          <CircularProgress size={20} />
        ) : (
          <DownloadIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton onClick={handlePrint}>
        <PrintIcon fontSize="small" />
      </IconButton>
      <Divider orientation="vertical" flexItem />
    </>
  );
};
