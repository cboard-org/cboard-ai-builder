'use client';
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import sxStyles from './styles';
import { useRouter } from 'next/navigation';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import OpenSidebarButton from '@/components/OpenSidebarButton/OpenSidebarButton';
import NewBoardLink from '@/components/NewBoardLink/NewBoardLink';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslations } from 'next-intl';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const messages = useTranslations('Dashboard.ConfirmDialog');
  const router = useRouter();
  const {
    cleanPrompt,
    boardLeaveStatus,
    setBoardLeaveStatus,
    boardLeaveDialogStatus,
    setBoardLeaveDialogStatus,
    setBoardIsUpToDate,
    isSidebarOpen,
    toogleIsSidebarOpen,
    setPrompt,
    isOutdated,
  } = useBoundStore(
    useShallow((state) => ({
      cleanPrompt: state.cleanPrompt,
      boardLeaveStatus: state.boardLeaveStatus,
      setBoardLeaveStatus: state.setBoardLeaveStatus,
      boardLeaveDialogStatus: state.boardLeaveDialogStatus,
      setBoardLeaveDialogStatus: state.setBoardLeaveDialogStatus,
      setBoardIsUpToDate: state.setBoardIsUpToDate,
      isSidebarOpen: state.isSidebarOpen,
      toogleIsSidebarOpen: state.toogleIsSidebarOpen,
      setPrompt: state.setPrompt,
      isOutdated: state.isOutdated,
    })),
  );

  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const closeDialog = () => setBoardLeaveDialogStatus(false);

  const handleNotSave = () => {
    if (boardLeaveStatus == 'new') {
      cleanPrompt();
      router.push('/board');
      setBoardLeaveStatus('');
    } else if (boardLeaveStatus) {
      const { description, rows, columns, colorScheme, shouldUsePictonizer } =
        boardLeaveStatus.prompt;
      setPrompt({
        description,
        rows,
        columns,
        colorScheme,
        shouldUsePictonizer,
      });
      boardLeaveStatus.isSavedBoard
        ? router.push(`/board/${boardLeaveStatus.id}`)
        : router.push('/board');
      setBoardLeaveStatus('');
    }
    setBoardIsUpToDate();
    closeDialog();
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isOutdated) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      if (isOutdated) {
        event.preventDefault();
        console.log(window.location.href);
        window.history.pushState(null, '', window.location.href);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isSidebarOpen}
        onClose={toogleIsSidebarOpen}
        sx={sxStyles.drawer}
      >
        <Box sx={sxStyles.drawerTopBar}>
          <OpenSidebarButton />
          <NewBoardLink />
        </Box>
        <Box sx={sxStyles.controls}>
          <>{children}</>
        </Box>
      </Drawer>
      <Dialog
        open={boardLeaveDialogStatus}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{messages('title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messages('content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotSave}>{messages('leave')}</Button>
          <Button onClick={closeDialog} variant="contained">
            {messages('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
