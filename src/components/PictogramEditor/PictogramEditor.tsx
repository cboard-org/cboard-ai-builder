import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import MorePictosButtons from './MorePictosButtons';
import PictogramSearcher from '../PictogramSearcher/PictogramSearcher';

type PictogramEditorProps = {
  carrousel: React.ReactNode;
  onSearchToogleClick: () => void;
  isSearching: boolean;
};

const PictogramEditor: React.FC<PictogramEditorProps> = ({
  carrousel,
  onSearchToogleClick,
  isSearching,
}) => {
  return (
    <Box
      p={isSearching ? 0 : 2}
      flexGrow={isSearching ? 1 : 0}
      overflow={isSearching ? 'hidden' : 'visible'}
      sx={styles.outlinedBox}
    >
      {!isSearching && (
        <>
          {carrousel}
          <MorePictosButtons onSearchClick={onSearchToogleClick} />
        </>
      )}
      {isSearching && (
        <PictogramSearcher toogleIsSearching={onSearchToogleClick} />
      )}
    </Box>
  );
};

export default PictogramEditor;
