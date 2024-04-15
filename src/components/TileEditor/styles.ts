import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  modal: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  paper: {
    width: { xs: '90%', sm: '75%' },
    maxWidth: '75vh',
    height: '75%',
    p: 4,
    color: 'text.primary',
  },
} satisfies Record<string, SxProps>;
