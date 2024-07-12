import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import AutoAwesome from '@mui/icons-material/AutoAwesome';

import styles from './styles';

type MorePictosButtonsProps = {
  onSearchClick: () => void;
  onGeneratedPictoClick: () => void;
};

const MorePictosButtons: FC<MorePictosButtonsProps> = ({
  onSearchClick,
  onGeneratedPictoClick,
}) => {
  return (
    <Box sx={styles.morePictosButton}>
      <Button startIcon={<Search />} variant="text" onClick={onSearchClick}>
        Search
      </Button>
      <Button
        variant="text"
        startIcon={<AutoAwesome />}
        onClick={onGeneratedPictoClick}
      >
        Generate
      </Button>
    </Box>
  );
};

export default MorePictosButtons;
