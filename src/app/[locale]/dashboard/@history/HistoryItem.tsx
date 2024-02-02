import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { HistoryRow, removeHistory } from './actions';
import { useFormatter } from 'next-intl';
import Box from '@mui/material/Box';

type Props = {
  history: HistoryRow;
  onDelete: (history: HistoryRow) => void;
};

export default function HistoryItem({ history, onDelete }: Props) {
  const format = useFormatter();
  const deleteHistory = async () => {
    onDelete(history);
    await removeHistory(history);
  };
  return (
    <>
      <ListItem
        divider
        secondaryAction={
          <Box>
            <IconButton size="small">
              <EditOutlined fontSize="small" />
            </IconButton>
            <IconButton onClick={deleteHistory} size="small">
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <ListItemText
          primary={history.prompt}
          secondary={format.relativeTime(new Date(history.date))}
          sx={{ pr: 4 }}
        />
      </ListItem>
    </>
  );
}
