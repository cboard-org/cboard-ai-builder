'use client';
import Box from '@mui/material/Box';
import MUIButton from '@mui/material/Button';
import Google from '@/components/icons/Google';
import SvgIcon from '@mui/material/SvgIcon';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Facebook from '@/components/icons/Facebook';
import Apple from '@/components/icons/Apple';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';
import { styles } from './styles';

function getIcon(id: string) {
  switch (id) {
    case 'google':
      return Google;
    case 'apple':
      return Apple;
    case 'facebook':
      return Facebook;
    default:
      return LockIcon;
  }
}

export default function Button({ provider }: { provider: ClientSafeProvider }) {
  const t = useTranslations('SignIn');
  const Icon = getIcon(provider.id);
  return (
    <MUIButton
      fullWidth
      variant="outlined"
      size="large"
      onClick={() =>
        signIn(provider.id, undefined, {
          prompt: 'select_account',
        })
      }
      sx={styles.button}
    >
      <Box sx={styles.iconContainer}>
        <SvgIcon>
          <Icon />
        </SvgIcon>
      </Box>

      <Box sx={styles.textContainer}>
        <Typography fontWeight={500}>
          {t('signInWith', { provider: provider.name })}
        </Typography>
      </Box>
      <SvgIcon sx={styles.hiddenIcon}>
        <Icon />
      </SvgIcon>
    </MUIButton>
  );
}
