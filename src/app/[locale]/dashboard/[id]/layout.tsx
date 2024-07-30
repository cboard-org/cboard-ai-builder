'use client';
import Box from '@mui/material/Box';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { useTheme, Theme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery } from '@mui/material';
import Topbar from './Topbar/Topbar';
import Menu from '@mui/icons-material/Menu';
import { INITIAL_CONTENT_ID } from './constants';
import NewBoardLink from './NewBoardLink/NewBoardLink';
import styles from './styles';

const xsSpacing = 3;

const mdPadding = 0;

const drawerWidth = 260; // Adjust this value as needed

const sxStyles = {
  app: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    color: (theme: Theme) => theme.palette.text.primary,
    height: '100%',
    pb: { xs: 0, md: 2, lg: 3 },
    display: 'flex',
  },
  drawer: {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: (theme: Theme) => theme.palette.grey[100],
    },
    borderRight: '0',
  },
  drawerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    p: 1,
  },
  controls: {
    px: 1,
    pb: 1,
  },
  board: {
    minHeight: 0,
    flexGrow: 1,
  },
};

export default function Dashboard(props: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  promptForm: React.ReactNode;
  board: React.ReactNode;
  savedData: React.ReactNode;
  params: {
    id: string;
  };
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const OpenSideBarButton = () => {
    /* translate */
    const toolbarTitle = sidebarOpen ? 'Close Sidebar' : 'Open Sidebar';
    return (
      <Tooltip title={toolbarTitle}>
        <IconButton onClick={toggleSidebar}>
          <Menu />
        </IconButton>
      </Tooltip>
    );
  };
  return (
    <Box sx={sxStyles.app}>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={sxStyles.drawer}
      >
        <Box sx={sxStyles.drawerTopBar}>
          <OpenSideBarButton />
          {/* <Box py={{ xs: xsPadding, md: mdPadding }}> */}
          <NewBoardLink />
          {/* </Box> */}
        </Box>
        <Box pb={{ xs: xsSpacing, md: mdPadding }}>
          <Box sx={sxStyles.controls}>{props.savedData}</Box>
        </Box>
      </Drawer>

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
        <Topbar
          OpenSidebarButton={OpenSideBarButton}
          isSidebarOpen={sidebarOpen}
        />
        <Box sx={sxStyles.board}>{props.board}</Box>

        {props.params.id === INITIAL_CONTENT_ID && (
          <Box sx={styles.promptContainer}>{props.promptForm}</Box>
        )}
      </Box>
    </Box>
  );
}
