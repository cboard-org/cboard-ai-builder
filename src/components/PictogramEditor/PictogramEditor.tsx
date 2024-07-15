import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import MorePictosButtons from './MorePictosButtons';
import PictogramSearcher from '../PictogramSearcher/PictogramSearcher';
import PictogramGeneratorFormDialog from '../PictogramGeneratorFormDialog/PictogramGeneratorFormDialog';

type PictogramEditorProps = {
  carrousel: React.ReactNode;
  onSearchToogleClick: () => void;
  onGeneratePictoInit: () => void;
  onChangePictogram: (src: string) => void;
  isSearching: boolean;
  showGenerationButton: boolean;
  tileLabel: string;
};

const PictogramEditor: React.FC<PictogramEditorProps> = ({
  carrousel,
  onSearchToogleClick,
  onGeneratePictoInit,
  onChangePictogram,
  isSearching,
  showGenerationButton,
  tileLabel,
}) => {
  const [showPictogramGeneratorDialog, setShowPictogramGeneratorDialog] =
    React.useState(false);
  const handleOnGeneratePictoClick = () => {
    setShowPictogramGeneratorDialog(true);
  };
  const handleGenerateInitClick = () => {
    onGeneratePictoInit();
    setShowPictogramGeneratorDialog(false);
  };
  return (
    <Box
      p={isSearching ? 0 : 2}
      flexGrow={isSearching ? 1 : 0}
      overflow={isSearching ? 'hidden' : 'visible'}
      sx={styles.outlinedBox}
    >
      {!isSearching && !showPictogramGeneratorDialog && (
        <>
          {carrousel}
          <MorePictosButtons
            onSearchClick={onSearchToogleClick}
            onGeneratePictoClick={handleOnGeneratePictoClick}
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
      {showPictogramGeneratorDialog && (
        <PictogramGeneratorFormDialog
          onClose={() => setShowPictogramGeneratorDialog(false)}
          onGenerateInitClick={handleGenerateInitClick}
          initialInput={tileLabel}
        />
      )}
    </Box>
  );
};

export default PictogramEditor;
