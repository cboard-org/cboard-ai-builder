'use client';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';

export default function Alert({ messages }: { messages: string }): JSX.Element {
  return (
    <MuiAlert sx={{ width: '100%' }} severity="error">
      <Typography>{messages}</Typography>
    </MuiAlert>
  );
}
