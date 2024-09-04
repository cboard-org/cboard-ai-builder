'use client';
import React from 'react';
import Modal from '../Modal/Modal';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import UserSection from './UserSection';
import AppSection from './AppSection';
import { SessionProvider } from 'next-auth/react';
import { styles } from './styles';

export default function Settings() {
  const [open, setOpen] = React.useState(false);
  const messages = useTranslations('Settings');

  const handleOnClick = () => {
    setOpen(true);
  };
  const handleOnClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOnClick}>
        <SettingsIcon fontSize="medium" />
      </IconButton>
      <Modal onClose={handleOnClose} open={open}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOnClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {messages('title')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={styles.paper}>
          {/* TODO avoid use SessionProvider, use a server component  instead */}
          <SessionProvider>
            <UserSection />
          </SessionProvider>
          <AppSection />
        </Paper>
      </Modal>
    </>
  );
}
