import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

import styles from './styles';

const MorePictosButtons: FC = () => {
  return (
    <Box sx={styles.morePictosButton}>
      <Button startIcon={<Search />} variant="text">
        Search
      </Button>
      <Button variant="text" startIcon={<AutoAwesome />}>
        Generate
      </Button>
    </Box>
  );
};

export default MorePictosButtons;
