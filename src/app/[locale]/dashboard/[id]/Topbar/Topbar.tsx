import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';
import NewBoardLink from '../NewBoardLink/NewBoardLink';
import OpenSideBarButton from '../../_components/OpenSideBarButton/OpenSideBarButton';

type TopbarProps = {
  isSidebarOpen: boolean;
  toogleSideBarOpen: () => void;
};

const Topbar: React.FC<TopbarProps> = ({
  isSidebarOpen,
  toogleSideBarOpen,
}) => {
  return (
    <Box sx={styles.topbar}>
      {!isSidebarOpen && (
        <>
          <OpenSideBarButton
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toogleSideBarOpen}
          />
          <NewBoardLink />
        </>
      )}
      <BrandTypography />
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
