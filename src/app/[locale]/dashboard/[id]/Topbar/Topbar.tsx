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
    <Box sx={styles.topbar}>
      {!isSidebarOpen && (
        <>
          <OpenSidebarButton />
          <NewBoardLink />
        </>
      )}
      <BrandTypography />
      <div style={styles.settings}>
        <Settings />
      </div>
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
