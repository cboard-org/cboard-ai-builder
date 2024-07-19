import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import MorePictosButtons from './MorePictosButtons';
import PictogramSearcher from '../PictogramSearcher/PictogramSearcher';
import PictogramGeneratorFormDialog from '../PictogramGeneratorFormDialog/PictogramGeneratorFormDialog';

type PictogramEditorProps = {
  carrousel: React.ReactNode;
  onSearchToogleClick: () => void;
  onGeneratePictoInit: (label: string) => Promise<void>;
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
  const [isGeneratingPictograms, setIsGeneratingPictograms] =
    React.useState(false);

  const handleOnGeneratePictoClick = () => {
    setShowPictogramGeneratorDialog(true);
  };
  const handleGenerateInitClick = async (label: string) => {
    setIsGeneratingPictograms(true);
    await onGeneratePictoInit(label);
    setShowPictogramGeneratorDialog(false);
    setIsGeneratingPictograms(false);
  };
  return (
    <Box
      p={isSearching ? 0 : 2}
      flexGrow={isSearching ? 1 : 0}
      overflow={isSearching ? 'hidden' : 'visible'}
      sx={styles.outlinedBox}
    >
      {!isSearching && !showPictogramGeneratorDialog && (
        <Box sx={styles.pictogramEditorContent}>
          {carrousel}
          <MorePictosButtons
            onSearchClick={onSearchToogleClick}
            onGeneratePictoClick={handleOnGeneratePictoClick}
            showGenerationButton={showGenerationButton}
          />
        </Box>
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
          isGeneratingPictograms={isGeneratingPictograms}
        />
      )}
    </Box>
  );
};

export default PictogramEditor;
