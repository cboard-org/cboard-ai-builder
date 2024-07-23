import React, { FC } from 'react';
import { useTranslations } from 'next-intl';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

import styles from './styles';

type MorePictosButtonsProps = {
  onSearchClick: () => void;
  onGeneratePictoClick: () => void;
  showGenerationButton: boolean;
};

const MorePictosButtons: FC<MorePictosButtonsProps> = ({
  onSearchClick,
  onGeneratePictoClick,
  showGenerationButton,
}) => {
  const message = useTranslations('Board.TileEditor.MorePictosButtons');

  return (
    <Box sx={styles.morePictosButton}>
      <Button
        startIcon={<Search />}
        variant="text"
        onClick={onSearchClick}
        aria-label={message('searchAccessibility')}
      >
        {message('search')}
      </Button>
      {showGenerationButton && (
        <Button
          variant="text"
          startIcon={<AutoFixHighIcon />}
          onClick={onGeneratePictoClick}
          aria-label={message('generateAccessibility')}
        >
          {message('generate')}
        </Button>
      )}
    </Box>
  );
};

export default MorePictosButtons;
