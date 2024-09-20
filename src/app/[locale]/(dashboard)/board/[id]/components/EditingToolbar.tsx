import EditTilesIcon from '@/components/EditTilesIcon/EditTilesIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function EditingToolbar() {
  return (
    <Tooltip title="Edit selected tiles">
      <IconButton>
        <EditTilesIcon />
      </IconButton>
    </Tooltip>
  );
}
