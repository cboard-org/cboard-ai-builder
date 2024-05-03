import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  outlinedBox: {
    backgroundColor: 'background.default',
    padding: 2,
    borderRadius: 2,
    border: 1,
    borderColor: 'primary.light',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '&:hover': {
      outline: 'none',
      borderColor: 'primary.main',
    },
    '&:focus-within': {
      outline: 'none',
      boxShadow: '0 0 0 1px #7b1fa2',
      borderColor: 'primary.main',
    },
  },
  morePictosButton: {
    display: 'flex',
    justifyContent: 'center',
    gap: 2,
  },
} satisfies Record<string, SxProps>;
