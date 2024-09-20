import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { INITIAL_CONTENT_MAX_WIDTH } from '../../../constants';
import { Theme } from '@mui/material/styles';

const borderRadius = 6;

export default {
  promptForm: {
    borderRadius,
    width: '100%',
    maxWidth: INITIAL_CONTENT_MAX_WIDTH,
  },
  submitButton: {
    color: 'primary.contrastText',
    marginRight: '6px',
    minWidth: '112px',
    borderRadius,
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
    '&:disabled': {
      color: 'primary.contrastText',
      pointerEvents: 'unset',
      cursor: 'progress',
    },
  },
  submitIcon: {
    color: 'primary.contrastText',
    justifyContent: 'center',
  },
  submitIconButton: {
    color: 'primary.contrastText',
    borderRadius,
    p: 1,
    backgroundColor: 'primary.main',
    '&:disabled': {
      color: 'primary.contrastText',
      backgroundColor: 'primary.main',
    },
  },
  submitSmallDeviceButton: {
    display: { xs: 'block', md: 'none' },
  },
  submitLargeDeviceButton: {
    display: { xs: 'none', md: 'block' },
  },
  promptImputsContainer: {
    color: 'primary.contrastText',
  },
  sizeSelectorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeSelector: {
    width: 'max-content',
    backgroundColor: 'grey.100',
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
