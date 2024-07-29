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
  tileControlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    px: { xs: 2, sm: 4, md: 8 },
  },
  arrowAndTileContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '75vh',
    height: '75%',
    pb: 2,
  },
  arrowButton: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  sectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: '100%',
    minHeight: '100%',
    height: '100%',
  },
  tileContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tileEditorDialogActions: {
    justifyContent: 'space-between',
  },
} satisfies Record<string, SxProps>;
