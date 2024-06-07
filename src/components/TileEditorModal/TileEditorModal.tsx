'use client';
import React from 'react';
import { TileRecord } from '@/commonTypes/Tile';
import TileEditor from './TileEditor';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function TileEditorModal({
  onClose,
  // tile: { suggestedImages, id: tileId },
  tile,
}: {
  onClose: () => void;
  tile: TileRecord;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <TileEditor onClose={onClose} initialTile={tile} />
      </Dialog>
    </>
  );
}
