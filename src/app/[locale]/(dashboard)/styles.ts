import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const paddings = { xs: 1, md: 2 };

export default {
  app: {
    height: '100%',
    display: 'flex',
    p: paddings,
  },
  board: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
} satisfies Record<string, SxProps>;
