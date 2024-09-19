'use client';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { useBoundStore } from '@/providers/StoreProvider';

const drawerWidth = 310; // Adjust this value as needed

export default function Main({ children }: { children: React.ReactNode }) {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isSidebarOpen } = useBoundStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
  }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ml: isMobile ? 0 : isSidebarOpen ? `${drawerWidth}px` : 0,
        transition: theme.transitions.create(['margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
}
