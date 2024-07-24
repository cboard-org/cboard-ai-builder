import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Theme, useTheme } from '@mui/material';
import styles from './styles';

type TopbarProps = {
  onToogleSidebarClick: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ onToogleSidebarClick }) => {
  const theme: Theme = useTheme();

  return (
    <Box sx={styles.topbar}>
      <IconButton
        onClick={onToogleSidebarClick}
        sx={{
          //   position: 'fixed',
          //   left: isMobile || !sidebarOpen ? 16 : drawerWidth + 16,
          transition: theme.transitions.create(['left'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Menu />
      </IconButton>
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
