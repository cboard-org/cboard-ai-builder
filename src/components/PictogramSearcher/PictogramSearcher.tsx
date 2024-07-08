import React, { FC, useState } from 'react';

import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles';

type PictogramSearcherProps = {
  toogleIsSearching: () => void;
};

const PictogramSearcher: FC<PictogramSearcherProps> = ({
  toogleIsSearching,
}) => {
  const [searchResults] = useState([
    '39109',
    '36530',
    '35829',
    '35637',
    '35389',
    '34741',
    '34745',
    '34145',
    '32536',
    '32534',
    '31418',
    '29925',
    '14262',
    '8275',
    '8261',
    '8229',
    '8200',
    '8199',
    '8105',
    '8093',
    '8089',
    '8083',
    '5071',
    '4873',
    '3388',
  ]);

  return (
    <Box sx={styles.pictogramSearcherContainer}>
      <SearchAppBar onArrowBackClick={toogleIsSearching} />
      <Grid container sx={styles.resultsContainer}>
        {searchResults.map((src) => (
          <Grid item xs={4} sm={3} key={src} sx={styles.resultItem}>
            <Image
              src={`https://api.arasaac.org/api/pictograms/${src}?hair=brown&skin=white`}
              alt="pictogram"
              width={80}
              height={80}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PictogramSearcher;
