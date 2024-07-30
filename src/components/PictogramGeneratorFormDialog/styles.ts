import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  pictogramGeneratorForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingIndicator: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  starsContainer: {
    display: 'flex',
    width: { xs: '90%', sm: '80%' },
    justifyContent: 'space-between',
  },
} satisfies Record<string, SxProps>;
