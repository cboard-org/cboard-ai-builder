'use client';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MUIButton from '@mui/material/Button';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';

export default function Button() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MUIButton
        fullWidth
        variant="outlined"
        sx={{ backgroundColor: '#fff' }}
        size="large"
        onClick={() => setOpen(true)}
      >
        Login
      </MUIButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          component: 'form',
          sx: {
            // p: { md: 2 },
            // pl: '24px',
            // pr: '21px',
          },
        }}
        // maxWidth={'md'}
      >
        <DialogTitle sx={{ pb: 2 }}>Login</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              variant="standard"
              size="medium"
              label="Email"
              type="email"
              required
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="standard"
              size="medium"
              label="Password"
              type="password"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <MUIButton
            size="medium"
            variant="text"
            onClick={() => setOpen(false)}
          >
            Cancel
          </MUIButton>
          <MUIButton size="medium" variant="contained" type="submit">
            Login
          </MUIButton>
        </DialogActions>
        <Box sx={{ px: 2, pb: 2 }}>
          <MUIButton size="medium" variant="text">
            Forgot Password?
          </MUIButton>
        </Box>
      </Dialog>
    </>
  );
}