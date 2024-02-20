import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import AlertTitle from '@mui/material/AlertTitle';
import styles from './styles';

export default function ErrorAndReset({ reset }: { reset: () => void }) {
  return (
    <Alert
      variant="outlined"
      severity="error"
      action={
        <IconButton
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          sx={styles.iconButton}
        >
          <RefreshIcon />
        </IconButton>
      }
      sx={{ m: 2 }}
    >
      <AlertTitle>ERROR</AlertTitle>
      Something went wrong getting your data!
    </Alert>
  );
}
