import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { INITIAL_CONTENT_MAX_WIDTH } from '../constants';
import theme from '@/theme';

export default {
  promptForm: {
    borderRadius: 6,
    width: '100%',
    maxWidth: INITIAL_CONTENT_MAX_WIDTH,
  },
  submitIconButton: {
    backgroundColor: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  submitIcon: { color: theme.palette.primary.contrastText },
  promptImputsContainer: { color: theme.palette.primary.contrastText },
  sizeSelectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeSelector: {
    width: 'max-content',
    backgroundColor: theme.palette.custom.filledBackground,
    borderRadius: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  sizeIcon: { ml: 2, color: 'text.secondary' },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  inputLabelStyle: { ml: 2 },
  textField: {
    backgroundColor: 'white',
    fontSize: '0.5rem',
    '.MuiFilledInput-underline:before': {
      borderBottom: 'none',
    },
    '.MuiFilledInput-underline:after': {
      borderBottom: 'none',
    },
    '.MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '.MuiFilledInput-root': {
      padding: 1,
      borderRadius: 5,
      overflow: 'hidden',
    },
    '.MuiInputBase-input': {
      padding: 1,
      backgroundColor: 'transparent',
    },
  },
} satisfies Record<string, SxProps>;
