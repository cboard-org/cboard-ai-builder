'use client';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import sxStyles from './styles';
import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import OpenSideBarButton from '../OpenSideBarButton/OpenSideBarButton';
import NewBoardLink from '@/app/[locale]/dashboard/_components/NewBoardLink/NewBoardLink';

export default function Sidebar({
  children,
  isSidebarOpen,
  toggleSideBar,
}: {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  toggleSideBar: () => void;
}) {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isSidebarOpen}
      onClose={toggleSideBar}
      sx={sxStyles.drawer}
    >
      <Box sx={sxStyles.drawerTopBar}>
        <OpenSideBarButton
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSideBar}
        />
        <NewBoardLink />
      </Box>
      {/* <Box sx={sxStyles.controls}>{props.savedData}</Box> */}
      {children}
    </Drawer>
  );
}
