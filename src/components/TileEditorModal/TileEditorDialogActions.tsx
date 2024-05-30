import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';

type PropType = {
  handleClose: () => void;
  handleSave: () => void;
};

const TileEditorDialogActions: React.FC<PropType> = ({
  handleClose,
  handleSave,
}) => {
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
        Save changes
      </Button>
    </DialogActions>
  );
};

export default TileEditorDialogActions;
