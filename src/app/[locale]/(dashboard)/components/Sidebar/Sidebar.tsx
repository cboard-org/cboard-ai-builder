'use client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import sxStyles from './styles';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import OpenSidebarButton from '@/components/OpenSidebarButton/OpenSidebarButton';
import NewBoardLink from '@/components/NewBoardLink/NewBoardLink';
import { useBoundStore } from '@/providers/StoreProvider';
import { useUpsertActualBoard } from '../../board/[id]/hooks/useUpsertActualBoard';
import { Modal, Button } from '@mui/material';
import { BoardRecord } from '@/commonTypes/Board';
import { useShallow } from 'zustand/react/shallow';

import './sidebar.css';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const cleanPrompt = useBoundStore((state) => state.cleanPrompt);
  const { boardLeaveStatus, setBoardLeaveStatus } = useBoundStore((state) => ({
    boardLeaveStatus: state.boardLeaveStatus,
    setBoardLeaveStatus: state.setBoardLeaveStatus,
  }));
  const { boardLeaveDialogStatus, setBoardLeaveDialogStatus } = useBoundStore(
    (state) => ({
      boardLeaveDialogStatus: state.boardLeaveDialogStatus,
      setBoardLeaveDialogStatus: state.setBoardLeaveDialogStatus,
    }),
  );
  const [prompt, setPrompt] = useBoundStore(
    useShallow((state) => [state.prompt, state.setPrompt]),
  );
  const theme: Theme = useTheme();
  const { isSidebarOpen, toogleIsSidebarOpen } = useBoundStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
    toogleIsSidebarOpen: state.toogleIsSidebarOpen,
  }));

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
      setPrompt(description, rows, columns, colorScheme, shouldUsePictonizer);
      console.log(prompt);
      boardLeaveStatus.isSavedBoard
        ? router.push(`/board/${boardLeaveStatus.id}`)
        : router.push('/board');
      console.log(prompt);
      setBoardLeaveStatus('');
    }
    closeDialog();
  };

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
      <Modal
        open={boardLeaveDialogStatus}
        onClose={closeDialog}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={sxStyles.dialog}>
          <h1 id="modal-title" className="text-center">
            You didn't save the board
          </h1>
          <div className="text-center margin-top-20">
            <Button
              variant="outlined"
              sx={sxStyles.button}
              onClick={handleNotSave}
            >
              Don't Save
            </Button>
            <Button variant="outlined" onClick={closeDialog}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
