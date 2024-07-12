import React, { FC } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import styles from './styles';

type MorePictosButtonsProps = {
  onSearchClick: () => void;
  onGeneratedPictoClick: () => void;
  showGenerationButton: boolean;
};

const MorePictosButtons: FC<MorePictosButtonsProps> = ({
  onSearchClick,
  onGeneratedPictoClick,
  showGenerationButton,
}) => {
  return (
    <Box sx={styles.morePictosButton}>
      <Button startIcon={<Search />} variant="text" onClick={onSearchClick}>
        Search
      </Button>
      {showGenerationButton && (
        <Button
          variant="text"
          startIcon={<AutoFixHighIcon />}
          onClick={onGeneratedPictoClick}
        >
          Generate
        </Button>
      )}
    </Box>
  );
};

export default MorePictosButtons;
