import React, { useMemo, useState } from 'react';
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
import { saveBoard, updateBoard } from './actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { BoardRecord } from '@/commonTypes/Board';
import { useRouter } from '@/navigation';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '../constants';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material';
// import EditingToolbar from './EditingToolbar';
import styles from './styles';
import { cboardExportAdapter } from '@/lib/exportHelpers/cboardExportAdapter';
import Settings from '@/components/Settings/Settings';

type Props = {
  isEditing: boolean;
  isSavingChange: boolean;
};

export default function Toolbar({ isEditing, isSavingChange }: Props) {
  const [isSaving, setisSaving] = useState(false);

  const router = useRouter();
  const setBoardIsUpToDate = useBoundStore((state) => state.setBoardIsUpToDate);
  const onSaveBoard = async (board: BoardRecord, isNewBoard: boolean) => {
    try {
      setisSaving(true);

      const savedBoard = isNewBoard
        ? await saveBoard(board)
        : await updateBoard(board);
      setBoardIsUpToDate();
      if (isNewBoard) router.push(`/dashboard/${savedBoard.id}`);
    } catch (err) {
      console.error(err);
    }
    setisSaving(false);
  };

  const [board, isOutdated] = useBoundStore(
    useShallow((state) => [state.board, state.isOutdated]),
  );
  const pathname = usePathname();

  const isNewBoard = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === STASHED_CONTENT_ID;
  }, [pathname]);

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
        onClick={() => onSaveBoard(board, isNewBoard)}
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
    } catch (err) {
      console.error(err);
      //Show Error Notification
    }
    setIsDownloadingBoard(false);
  };

  return [handleDownloadClick, isDownloadingBoard];
};

const DefaultToolbar = () => {
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
      <IconButton>
        <PrintIcon fontSize="small" />
      </IconButton>
      <Settings />
      <Divider orientation="vertical" flexItem />
    </>
  );
};
