import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { INITIAL_CONTENT_MAX_WIDTH } from '../constants';

export default {
  promptForm: {
    borderRadius: 6,
    width: '100%',
    maxWidth: INITIAL_CONTENT_MAX_WIDTH,
  },
} satisfies Record<string, SxProps>;
