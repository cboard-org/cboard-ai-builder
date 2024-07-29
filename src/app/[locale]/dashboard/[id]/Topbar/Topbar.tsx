import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material';
import styles from './styles';

type TopbarProps = {
  OpenSidebarButton: () => React.JSX.Element;
  isSidebarOpen: boolean;
};

const Topbar: React.FC<TopbarProps> = ({
  OpenSidebarButton,
  isSidebarOpen,
}) => {
  const theme: Theme = useTheme();

  return (
    <Box sx={styles.topbar}>
      {!isSidebarOpen && (
        <>
          <OpenSidebarButton />
          <IconButton
            sx={{
              //   left: isMobile || !sidebarOpen ? 16 : drawerWidth + 16,
              transition: theme.transitions.create(['left'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <AddBoxIcon />
          </IconButton>
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
