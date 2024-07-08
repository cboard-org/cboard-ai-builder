import React, { FC } from 'react';

import Box from '@mui/material/Box';
import SearchAppBar from './SearchAppBar';

type PictogramSearcherProps = {
  toogleIsSearching: () => void;
};

const PictogramSearcher: FC<PictogramSearcherProps> = ({
  toogleIsSearching,
}) => {
  return (
    <Box>
      <SearchAppBar onArrowBackClick={toogleIsSearching} />
    </Box>
  );
};

export default PictogramSearcher;
