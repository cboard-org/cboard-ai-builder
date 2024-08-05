'use client';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styles from './styles';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({
  onClose,
  open,
  children,
}: {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        maxWidth="sm"
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        aria-modal="true"
        sx={{
          '& .MuiDialog-paper': {
            ...(fullScreen ? styles.dialogPaperFullScreen : styles.dialogPaper),
          },
        }}
        TransitionComponent={Transition}
      >
        {children}
      </Dialog>
    </>
  );
}
