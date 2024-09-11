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
import { useTranslations } from 'next-intl';

const drawerWidth = 310; // Adjust this value as needed
const paddings = { xs: 1, md: 2, lg: 3 };
const borderRadius = 4;
const sxStyles = {
  app: {
    height: '100%',
    display: 'flex',
    p: paddings,
  },
  drawer: {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: 'primary',
      borderRight: '0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      py: paddings,
      pl: paddings,
    },
  },
  drawerMobile: {
    '& .MuiDrawer-paper': {
      backgroundColor: (theme: Theme) => theme.palette.grey[100],
    },
  },
  drawerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    p: 1,
    flexShrink: 0,
    backgroundColor: (theme: Theme) => theme.palette.grey[100],
    borderRadius,
  },
  controls: {
    minHeight: 0,
    px: 1,
    pb: 1,
    backgroundColor: (theme: Theme) => theme.palette.grey[100],
    borderRadius,
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false); // the initial could be in the store
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const message = useTranslations('Dashboard');

  const OpenSideBarButton = () => {
    const toolbarTitle = sidebarOpen
      ? message('closeSidebar')
      : message('openSidebar');
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
          <NewBoardLink />
        </Box>
        <Box sx={sxStyles.controls}>{props.savedData}</Box>
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
        {props.children}
      </Box>
    </Box>
  );
}
