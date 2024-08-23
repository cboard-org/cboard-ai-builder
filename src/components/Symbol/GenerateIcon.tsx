import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Tooltip from '@mui/material/Tooltip';

export default function GenerateIcon() {
  return (
    <Tooltip title={'Create a Pictogram'}>
      <AutoAwesomeIcon color="secondary" />
    </Tooltip>
  );
}
