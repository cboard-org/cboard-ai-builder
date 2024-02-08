import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Google from '@/components/icons/Google';
import SvgIcon from '@mui/material/SvgIcon';
import { ClientSafeProvider } from 'next-auth/react';
import Facebook from '@/components/icons/Facebook';
import Apple from '@/components/icons/Apple';
import LockIcon from '@mui/icons-material/Lock';

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

export default function OAuthButton({
  provider,
}: {
  provider: ClientSafeProvider;
}) {
  const Icon = getIcon(provider.id);
  return (
    <Button
      fullWidth
      variant="outlined"
      size="large"
      sx={{
        color: '#2B2B2B',
        fontWeight: 500,
        backgroundColor: '#FFFFFF',
        borderColor: '#0000003B',
        borderWidth: '1px',
        textTransform: 'initial',
        pr: '16px',
        py: '8px',
        '&:hover': {
          borderColor: '#2B2B2B',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          alignContent: 'center',
          alignSelf: 'center',
          borderRight: '1px #0000003B solid',
          pr: '12px',
          py: '3px',
        }}
      >
        <SvgIcon>
          <Icon />
        </SvgIcon>
      </Box>

      <Box sx={{ width: '100%', fontWeight: 500 }}>
        Iniciar sesión con {provider.name}
      </Box>
      <SvgIcon sx={{ visibility: 'hidden' }}>
        <Icon />
      </SvgIcon>
    </Button>
  );
}
