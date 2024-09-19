import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/icons-material/Menu';
import { useTranslations } from 'next-intl';
import { useBoundStore } from '@/providers/StoreProvider';

export default function OpenSidebarButton() {
  const { isSidebarOpen, toogleIsSidebarOpen } = useBoundStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
    toogleIsSidebarOpen: state.toogleIsSidebarOpen,
  }));

  const message = useTranslations('Dashboard');
  const toolbarTitle = isSidebarOpen
    ? message('closeSidebar')
    : message('openSidebar');

  return (
    <Tooltip title={toolbarTitle}>
      <IconButton onClick={toogleIsSidebarOpen}>
        <Menu />
      </IconButton>
    </Tooltip>
  );
}
