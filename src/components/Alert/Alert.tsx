'use client';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

export default function Alert({ messages }: { messages: string }): JSX.Element {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <MuiAlert
      sx={{ width: '100%' }}
      severity="error"
      variant={isDarkMode ? 'filled' : 'standard'}
    >
      <Typography>{messages}</Typography>
    </MuiAlert>
  );
}
