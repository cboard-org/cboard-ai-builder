import Box from '@mui/material/Box';
import React from 'react';
import styles from './styles';
import MorePictosButtons from './MorePictosButtons';

type PictogramEditorProps = {
  carrousel: React.ReactNode;
};

const PictogramEditor: React.FC<PictogramEditorProps> = ({ carrousel }) => {
  return (
    <Box sx={styles.outlinedBox}>
      {carrousel}
      <MorePictosButtons />
    </Box>
  );
};

export default PictogramEditor;
