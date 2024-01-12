'use client';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { HistoryRow, removeHistory } from './actions';
type Props = {
  history: HistoryRow;
  onDelete: (history: HistoryRow) => void;
};

export default function HistoryItem({ history, onDelete }: Props) {
  const deleteHistory = async () => {
    onDelete(history);
    await removeHistory(history);
  };
  return (
    <>
      <ListItem disableGutters>
        <ListItemText primary={history.prompt} secondary={'Yesterday'} />
        <ListItemSecondaryAction>
          <IconButton>
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton onClick={deleteHistory}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}
