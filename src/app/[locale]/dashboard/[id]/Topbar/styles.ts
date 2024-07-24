import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  topbar: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    p: 2,
  },
  brandTypography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ml: 2,
  },
} satisfies Record<string, SxProps>;
