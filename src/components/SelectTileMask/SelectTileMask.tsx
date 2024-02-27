import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system';
import { styles } from './styles';

export default function SelectTileMask({
  isSelected,
}: {
  isSelected: boolean;
}) {
  return (
    <Box sx={styles.checkCircle}>
      {isSelected && <CheckCircleIcon sx={styles.checkCircleIcon} />}
    </Box>
  );
}
