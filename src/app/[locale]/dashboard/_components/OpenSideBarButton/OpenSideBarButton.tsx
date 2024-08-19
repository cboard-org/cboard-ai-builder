import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/icons-material/Menu';
import { useTranslations } from 'next-intl';

export default function OpenSideBarButton({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const message = useTranslations('Dashboard');
  const toolbarTitle = isSidebarOpen
    ? message('closeSidebar')
    : message('openSidebar');
  return (
    <Tooltip title={toolbarTitle}>
      <IconButton onClick={toggleSidebar}>
        <Menu />
      </IconButton>
    </Tooltip>
  );
}
