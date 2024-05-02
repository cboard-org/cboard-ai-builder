import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  outlinedBox: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 2,
    border: 2,
    borderColor: 'primary.light',
    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  morePictosButton: {
    display: 'flex',
    justifyContent: 'space-around',
  },
} satisfies Record<string, SxProps>;
