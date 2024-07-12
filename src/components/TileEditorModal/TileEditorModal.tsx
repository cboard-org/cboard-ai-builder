'use client';
import React from 'react';
import { TileRecord } from '@/commonTypes/Tile';
import TileEditor from './TileEditor';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './styles';

export default function TileEditorModal({
  onClose,
  // tile: { suggestedImages, id: tileId },
  tile,
  onNextGeneratedPictoClick,
  isChangingPicto,
}: {
  onClose: () => void;
  tile: TileRecord;
  onNextGeneratedPictoClick: () => void;
  isChangingPicto: boolean;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiDialog-paper': {
            ...(fullScreen ? styles.dialogPaperFullScreen : styles.dialogPaper),
          },
        }}
      >
        <TileEditor
          onClose={onClose}
          initialTile={tile}
          onNextGeneratedPictoClick={onNextGeneratedPictoClick}
          isChangingPicto={isChangingPicto}
        />
      </Dialog>
    </>
  );
}
