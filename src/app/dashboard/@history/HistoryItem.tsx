import DeleteOutline from '@mui/icons-material/DeleteOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
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
