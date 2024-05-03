'use client';
import React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styles from './styles';
import { TileRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';

import TileEditor from './TileEditor';

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

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Paper id="tileEditor" sx={styles.paper}>
          <Box sx={styles.tileControlsContainer}>
            <TileEditor initialTile={tile} />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
