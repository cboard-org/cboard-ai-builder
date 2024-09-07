import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const borderRadius = 6;

export default {
  newBoardButton: {
    borderRadius,
  },
  linkContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
} satisfies Record<string, SxProps>;
