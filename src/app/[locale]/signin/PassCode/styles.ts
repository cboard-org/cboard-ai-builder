import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const styles = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: { xs: 'common.background', md: 'transparent' },
    padding: { xs: 3, md: 0 },
    borderRadius: { xs: 7, md: 0 },
  },
  textFieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    borderRadius: 7,
    flex: 1,
  },
  textField: {
    width: '100%',
    flex: 1,
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  },
  alert: {
    width: '100%',
    marginTop: 2,
  },
} satisfies Record<string, SxProps>;
