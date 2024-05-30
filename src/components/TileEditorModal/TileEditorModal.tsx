'use client';
import React from 'react';
import { TileRecord } from '@/commonTypes/Tile';
import TileEditor from './TileEditor';
import ConfirmButtons from './TileEditorDialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
  const handleClose = () => {
    onClose();
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ConfirmButtons handleClose={() => {}} handleSave={() => {}} />
        <DialogContent>
          <TileEditor initialTile={tile} />
        </DialogContent>
      </Dialog>
    </>
  );
}
