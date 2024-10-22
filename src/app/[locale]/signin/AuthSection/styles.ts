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
    color: { xs: 'black', md: 'inherit' },
  },
  holaText: {
    fontWeight: 600,
    fontSize: { xs: '32px', md: '48px' },
    pb: '16px',
    color: { xs: 'black', md: 'inherit' },
  },
  welcomeText: { fontSize: '16px' },
  divider: {
    my: { xs: 2, md: 4 },
    borderColor: { xs: '#6D6D6D', md: '#C9C9C9' },
  },
  signUpButton: {
    backgroundColor: { xs: '#7b1fa2', md: '' },
    color: 'white',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
} satisfies Record<string, SxProps>;
