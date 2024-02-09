'use client';
import MUIButton from '@mui/material/Button';
import { useState } from 'react';
import Dialog from './Dialog';

export default function Container() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MUIButton
        fullWidth
        variant="outlined"
        sx={{ backgroundColor: '#fff' }}
        size="large"
        onClick={() => setOpen(true)}
      >
        Login
      </MUIButton>
      <Dialog handleClose={() => setOpen(false)} open={open} />
    </>
  );
}
