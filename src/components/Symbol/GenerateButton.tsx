import IconButton from '@mui/material/IconButton';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Tooltip from '@mui/material/Tooltip';

export default function GenerateButton() {
  return (
    <Tooltip title={'Create a Pictogram'}>
      <IconButton>
        <AutoAwesomeIcon />
      </IconButton>
    </Tooltip>
  );
}
