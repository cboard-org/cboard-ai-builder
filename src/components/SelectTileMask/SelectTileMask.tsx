import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from '@mui/system';

export default function SelectTileMask({
  isSelected,
}: {
  isSelected: boolean;
}) {
  const styles = {
    CheckCircle: {
      color: '#1976d2',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.7)',
      width: '32px',
      height: '32px',
      position: 'absolute',
      bottom: '0',
      right: '0',
      margin: '10px',
      border: '2px solid',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkCircleIcon: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: '50%',
    },
  };
  return (
    <Box sx={styles.CheckCircle}>
      {isSelected && <CheckCircleIcon sx={styles.checkCircleIcon} />}
    </Box>
  );
}
