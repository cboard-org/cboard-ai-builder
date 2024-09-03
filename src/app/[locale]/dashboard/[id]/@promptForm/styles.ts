import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { INITIAL_CONTENT_MAX_WIDTH } from '../constants';
import { Theme } from '@mui/material/styles';

const borderRadius = 6;

export default {
  promptForm: {
    borderRadius,
    width: '100%',
    maxWidth: INITIAL_CONTENT_MAX_WIDTH,
  },
  submitButton: {
    color: (theme) => theme.palette.primary.contrastText,
    marginRight: '6px',
    minWidth: '112px',
    borderRadius,
    backgroundColor: (theme) => theme.palette.primary.main,
    '&:hover': {
      backgroundColor: (theme) => theme.palette.primary.dark,
    },
  },
  submitIcon: {
    color: (theme) => theme.palette.primary.contrastText,
  },
  promptImputsContainer: {
    color: (theme) => theme.palette.primary.contrastText,
  },
  sizeSelectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeSelector: {
    width: 'max-content',
    backgroundColor: (theme) => theme.palette.grey[100],
    borderRadius,
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
      borderRadius,
      overflow: 'hidden',
    },
    '.MuiInputBase-input': {
      padding: 1,
      backgroundColor: 'transparent',
    },
  },
} satisfies Record<string, SxProps<Theme>>;
