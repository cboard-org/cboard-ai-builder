import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  exampleButton: {
    width: '100%',
    p: 0,
  },
  textArea: {
    backgroundColor: 'white',
    color: 'black',
    pointerEvents: 'none',
    width: '100%',
    maxWidth: '250px',
  },
} satisfies Record<string, SxProps>;
