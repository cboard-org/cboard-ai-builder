import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import MorePictosButtons from './MorePictosButtons';
import PictogramSearcher from '../PictogramSearcher/PictogramSearcher';

type PictogramEditorProps = {
  carrousel: React.ReactNode;
  onSearchToogleClick: () => void;
  onGeneratedPictoClick: () => void;
  onChangePictogram: (src: string) => void;
  isSearching: boolean;
  showGenerationButton: boolean;
};

const PictogramEditor: React.FC<PictogramEditorProps> = ({
  carrousel,
  onSearchToogleClick,
  onGeneratedPictoClick,
  onChangePictogram,
  isSearching,
  showGenerationButton,
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
          <MorePictosButtons
            onSearchClick={onSearchToogleClick}
            onGeneratedPictoClick={onGeneratedPictoClick}
            showGenerationButton={showGenerationButton}
          />
        </>
      )}
      {isSearching && (
        <PictogramSearcher
          toogleIsSearching={onSearchToogleClick}
          onChangePictogram={onChangePictogram}
        />
      )}
    </Box>
  );
};

export default PictogramEditor;
