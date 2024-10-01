'use client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import sxStyles from './styles';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import OpenSidebarButton from '@/components/OpenSidebarButton/OpenSidebarButton';
import NewBoardLink from '@/components/NewBoardLink/NewBoardLink';
import { useBoundStore } from '@/providers/StoreProvider';

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
  const theme: Theme = useTheme();
  const { isSidebarOpen, toogleIsSidebarOpen } = useBoundStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
    toogleIsSidebarOpen: state.toogleIsSidebarOpen,
  }));

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    </>
  );
}
