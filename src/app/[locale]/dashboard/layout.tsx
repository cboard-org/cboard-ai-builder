'use client';
import React from 'react';
import Box from '@mui/material/Box';
import { useTheme, Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Topbar from './_components/Topbar/Topbar';
import Sidebar from './_components/Sidebar/Sidebar';

const drawerWidth = 310; // Adjust this value as needed

const sxStyles = {
  app: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    color: (theme: Theme) => theme.palette.text.primary,
    height: '100%',
    pb: { xs: 0, md: 2, lg: 3 },
    display: 'flex',
  },
};

export default function Home({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true); // the initial could be in the store
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={sxStyles.app}>
      <Sidebar toggleSideBar={toggleSidebar} isSidebarOpen={sidebarOpen}>
        LOL
      </Sidebar>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          ml: isMobile ? 0 : sidebarOpen ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: '100%',
          height: '100%',
        }}
      >
        <Topbar isSidebarOpen={sidebarOpen} toogleSideBarOpen={toggleSidebar} />
        {children}
      </Box>
    </Box>
  );
}
