import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  modal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  paper: {
    width: { xs: '90%', sm: '80%' },
    maxWidth: '75vh',
    height: '75%',
    color: 'text.primary',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
  },
  imageControls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    px: 3,
  },
  arrowAndTileContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '75vh',
    height: '75%',
    pb: 2,
  },
  arrowButton: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
} satisfies Record<string, SxProps>;
