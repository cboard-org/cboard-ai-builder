import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  stack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  list: { width: '100%' },
  pagination: { paddingBottom: 1 },
} satisfies Record<string, SxProps>;
