import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';

type TilePreviewProps = {
  TileGalery: React.ReactNode;
  label?: string;
};

const TilePreview: React.FC<TilePreviewProps> = ({ TileGalery, label }) => {
  return (
    <Box sx={styles.tileContainer}>
      {TileGalery}
      <div className="embla-tile__label-container">
        <Typography
          variant="body1"
          fontWeight={700}
          className="embla-tile__label"
        >
          {label}
        </Typography>
      </div>
    </Box>
  );
};

export default TilePreview;
