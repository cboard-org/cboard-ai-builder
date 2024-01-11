'use client';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import { HistoryRow } from './page';

export default function HistoryItem({ history }: { history: HistoryRow }) {
  return (
    <>
      <ListItem disableGutters>
        <ListItemText primary={history.prompt} secondary={'Yesterday'} />
        <ListItemSecondaryAction>
          <IconButton>
            <EditOutlined fontSize="small" />
          </IconButton>
          <IconButton>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
}
