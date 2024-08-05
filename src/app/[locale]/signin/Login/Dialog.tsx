'use client';
import MUIDialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MUIButton from '@mui/material/Button';
import { useState } from 'react';
import DialogActions from '@mui/material/DialogActions';
import { signIn } from 'next-auth/react';
import Alert from '@mui/material/Alert';
import { useLocale, useTranslations } from 'next-intl';
import { styles } from './styles';
import { DEFAULT_CALLBACK_URL } from '../constants';
export default function Dialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const t = useTranslations('SignIn.LoginDialog');
  const locale = useLocale();
  const [error, setError] = useState<string | false>(false);
  const [loading, setLoading] = useState(false);
  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: async (evt: React.FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
          setLoading(true);
          const formData = new FormData(evt.currentTarget);
          const response = await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            callbackUrl: locale
              ? `/${locale}/${DEFAULT_CALLBACK_URL}`
              : DEFAULT_CALLBACK_URL,
          });
          if (response?.ok) return;
          if (response?.error) {
            setError(t('errorMessage'));
          }
          setLoading(false);
        },
        sx: {
          // p: { md: 2 },
          // pl: '24px',
          // pr: '21px',
        },
      }}
      // maxWidth={'md'}
    >
      <DialogTitle sx={styles.dialogTitle}>{t('title')}</DialogTitle>
      <DialogContent>
        <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
        <Box>
          <TextField
            fullWidth
            variant="standard"
            size="medium"
            label="Email"
            type="email"
            name="email"
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
            name="password"
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <MUIButton size="medium" variant="text" onClick={handleClose}>
          {t('cancelButton')}
        </MUIButton>
        <MUIButton
          size="medium"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {t('loginButton')}
        </MUIButton>
      </DialogActions>
      <Box sx={styles.dialogForgotPasswordContainer}>
        <MUIButton size="medium" variant="text">
          {t('forgotPassword')}
        </MUIButton>
      </Box>
    </MUIDialog>
  );
}
