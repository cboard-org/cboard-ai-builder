import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  topbarContainer: {
    display: 'grid',
    gridAutoColumns: 'minmax(0, 1fr)',
    gridAutoFlow: 'column',
    p: 1,
  },
  brandTypography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  middleSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
} satisfies Record<string, SxProps>;
