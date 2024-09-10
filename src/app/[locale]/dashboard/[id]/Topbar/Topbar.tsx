import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';
import NewBoardLink from '../NewBoardLink/NewBoardLink';
import Settings from '@/components/Settings/Settings';

type TopbarProps = {
  OpenSidebarButton: () => React.JSX.Element;
  isSidebarOpen: boolean;
};

const Topbar: React.FC<TopbarProps> = ({
  OpenSidebarButton,
  isSidebarOpen,
}) => {
  return (
    <Box sx={styles.topbarContainer}>
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
