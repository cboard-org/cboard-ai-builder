import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  pictogramSearcherContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  resultsContainer: { overflowY: 'scroll' },
  resultItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 1,
  },
} satisfies Record<string, SxProps>;
