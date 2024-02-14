'use client';
import MUIButton from '@mui/material/Button';
import { useState } from 'react';
import Dialog from './Dialog';
import { useTranslations } from 'next-intl';

export default function Container() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('SignIn');
  return (
    <>
      <MUIButton
        fullWidth
        variant="outlined"
        sx={{ backgroundColor: '#fff' }}
        size="large"
        onClick={() => setOpen(true)}
      >
        {t('loginButton')}
      </MUIButton>
      <Dialog handleClose={() => setOpen(false)} open={open} />
    </>
  );
}
