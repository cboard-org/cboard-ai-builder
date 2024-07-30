import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useTranslations } from 'next-intl';

type PropType = {
  handleClose: () => void;
  handleSave: () => void;
};

const TileEditorDialogActions: React.FC<PropType> = ({
  handleClose,
  handleSave,
}) => {
  const message = useTranslations('Board.TileEditor.TileEditorDialogActions');

  return (
    <DialogActions sx={styles.tileEditorDialogActions}>
      <IconButton onClick={handleClose}>
        <ArrowBackIcon />
      </IconButton>
      <Button
        onClick={handleSave}
        autoFocus
        variant="contained"
        startIcon={<BookmarkIcon />}
      >
        {message('saveChanges')}
      </Button>
    </DialogActions>
  );
};

export default TileEditorDialogActions;
