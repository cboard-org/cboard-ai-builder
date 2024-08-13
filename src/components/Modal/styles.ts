import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  dialogPaperFullScreen: {
    margin: 0,
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    maxWidth: '100%',
  },
  dialogPaper: {
    width: '90%',
    maxWidth: '550px',
    height: '85%',
    maxHeight: '90%',
    display: 'flex',
    flexDirection: 'column',
  },
} satisfies Record<string, SxProps>;
