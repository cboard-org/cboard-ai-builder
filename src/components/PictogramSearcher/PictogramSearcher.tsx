import React, { FC, useState } from 'react';

import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles';
import Button from '@mui/material/Button';

type PictogramSearcherProps = {
  toogleIsSearching: () => void;
  onChangePictogram: (src: string) => void;
};

const PictogramSearcher: FC<PictogramSearcherProps> = ({
  toogleIsSearching,
  onChangePictogram,
}) => {
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const [error, setError] = useState(false);

  const handlePictogramClick = async (src: string) => {
    const fetchArasaacImageUrl = async () => {
      try {
        const suggestionImageReq = `${src}&url=true`;
        const res = await fetch(suggestionImageReq);
        const data = await res.json();
        const imageArasaacUrl = data.image;
        return imageArasaacUrl.length ? imageArasaacUrl : src;
      } catch (err) {
        return src;
      }
    };

    const selectedPicto = await fetchArasaacImageUrl();
    onChangePictogram(selectedPicto);
    toogleIsSearching();
  };

  return (
    <Box sx={styles.pictogramSearcherContainer}>
      <SearchAppBar
        onArrowBackClick={toogleIsSearching}
        setSuggestions={{ setSearchSuggestions, setError }}
      />
      <Grid container sx={styles.resultsContainer}>
        {searchSuggestions.map((id) => {
          const src = `https://api.arasaac.org/api/pictograms/${id}?hair=brown&skin=white`;
          return (
            <Grid item xs={4} sm={3} key={id} sx={styles.resultItem}>
              <Button onClick={() => handlePictogramClick(src)}>
                <Image
                  src={src}
                  alt="pictogram"
                  width={85}
                  height={85}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Button>
            </Grid>
          );
        })}
      </Grid>
      {error && <p>Error</p>}
    </Box>
  );
};

export default PictogramSearcher;
