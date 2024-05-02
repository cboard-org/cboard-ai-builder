import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  sectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  tileContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
} satisfies Record<string, SxProps>;
