'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';
import NewBoardLink from '@/components/NewBoardLink/NewBoardLink';
import Settings from '@/components/Settings/Settings';
import OpenSidebarButton from '@/components/OpenSidebarButton/OpenSidebarButton';
import { useBoundStore } from '@/providers/StoreProvider';

const Topbar: React.FC = ({}) => {
  const { isSidebarOpen } = useBoundStore((state) => ({
    isSidebarOpen: state.isSidebarOpen,
  }));
  return (
    <Box sx={styles.topbarContainer} component={'nav'}>
      <Box sx={styles.leftSection}>
        {!isSidebarOpen && (
          <>
            <OpenSidebarButton />
            <NewBoardLink />
          </>
        )}
      </Box>
      <Box sx={styles.middleSection}>
        <BrandTypography />
      </Box>
      <Box sx={styles.rightSection}>
        <Settings />
      </Box>
    </Box>
  );
};

const BrandTypography = () => {
  return (
    <Typography
      variant="subtitle1"
      component="h2"
      sx={styles.brandTypography}
      fontSize={16}
    >
      <Box component="span" fontWeight="bold">
        Cboard
      </Box>
      {' ' + 'Builder'}
    </Typography>
  );
};

export default Topbar;
