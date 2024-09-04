import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  topbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    p: 1,
    flexShrink: 0,
    justifyContent: 'space-between',
  },
  brandTypography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ml: 2,
    minHeight: 40,
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  rightSection: {
    alignSelf: 'flex-end',
  },
} satisfies Record<string, SxProps>;
