'use client';
import React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styles from './styles';

export default function TileEditor({
  children,
  isEditing,
  onClose,
}: {
  children: React.ReactNode;
  isEditing: boolean;
  onClose: () => void;
}) {
  const handleClose = () => {
    onClose();
  };

  if (!isEditing) return children;

  return (
    <>
      {children}
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Paper id="tileEditor" sx={styles.paper}>
          {children}
        </Paper>
      </Modal>
    </>
  );
}
