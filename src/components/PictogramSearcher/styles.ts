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
  infoContainer: {
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  alertContainer: {
    width: '100%',
    display: 'flex',
    gap: 2,
  },
} satisfies Record<string, SxProps>;
