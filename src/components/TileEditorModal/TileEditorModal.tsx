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
  generatePicto,
  pictogramIndexBeforeSave,
}: {
  onClose: () => void;
  tile: TileRecord;
  onNextGeneratedPictoClick: () => Promise<void>;
  isChangingPicto: boolean;
  generatePicto: (label: string) => Promise<void>;
  pictogramIndexBeforeSave: number | null;
  setUpdatedTile: (tile: TileRecord) => void;
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
          primaryTile={tile}
          onNextGeneratedPictoClick={onNextGeneratedPictoClick}
          isChangingPicto={isChangingPicto}
          generatePicto={generatePicto}
          pictogramIndexBeforeSave={pictogramIndexBeforeSave}
        />
      </Dialog>
    </>
  );
}
