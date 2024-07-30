import React, { FC, useState } from 'react';

import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import styles from './styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import EditNoteIcon from '@mui/icons-material/EditNote';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

type PictogramSearcherProps = {
  toogleIsSearching: () => void;
  onChangePictogram: (src: string) => void;
};

const AlertComponent: FC<{
  isError: boolean;
  isEmptyResults: boolean;
  isEmptySearchAlert: boolean;
}> = ({ isError, isEmptyResults, isEmptySearchAlert }) => {
  const message = useTranslations('Board.TileEditor.PictogramSearcher');

  return (
    <Box sx={styles.alertContainer}>
      {isEmptyResults && <YoutubeSearchedForIcon />}
      {isError && <ReportGmailerrorredIcon />}
      {isEmptySearchAlert && <EditNoteIcon />}
      <Box>
        <Typography fontWeight={'bold'}>
          {isEmptyResults && message('pictogramNotFound')}
          {isError && message('error')}
          {isEmptySearchAlert && message('writeKeywordToSearch')}
        </Typography>
        <Typography>
          {isEmptyResults &&
            message('trySearchingWithAnotherKeywordOrGenerateIt')}
          {isError && message('couldNotFetchPictograms')}
          {isEmptySearchAlert && message('searchPictogramUsingTextField')}
        </Typography>
      </Box>
    </Box>
  );
};

const PictogramSearcher: FC<PictogramSearcherProps> = ({
  toogleIsSearching,
  onChangePictogram,
}) => {
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyResults, setIsEmptyResults] = useState(false);

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

  const isEmptySearchAlert = !isError && !isLoading && !isEmptyResults;

  return (
    <Box sx={styles.pictogramSearcherContainer}>
      <SearchAppBar
        onArrowBackClick={toogleIsSearching}
        setSuggestions={{
          setSearchSuggestions,
          setIsError,
          setIsLoading,
          setIsEmptyResults,
        }}
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
      {!searchSuggestions.length && (
        <Box sx={styles.infoContainer}>
          <AlertComponent
            isError={isError}
            isEmptyResults={isEmptyResults}
            isEmptySearchAlert={isEmptySearchAlert}
          />
          {isLoading && <CircularProgress />}
        </Box>
      )}
    </Box>
  );
};

export default PictogramSearcher;
