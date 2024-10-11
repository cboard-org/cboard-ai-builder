import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const styles = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '370px',
    alignSelf: 'flex-end',
  },
  welcomeTextContainer: {
    alignSelf: { xs: 'center', md: 'start' },
    textAlign: { xs: 'center', md: 'inherit' },
  },
  holaText: {
    fontWeight: 600,
    fontSize: { xs: '32px', md: '48px' },
    color: '#181717',
    pb: '16px',
  },
  welcomeText: { color: '#2B2B2B', fontSize: '16px' },
  divider: {
    my: { xs: 2, md: 4 },
    borderColor: { xs: '#6D6D6D', md: '#C9C9C9' },
  },
} satisfies Record<string, SxProps>;
