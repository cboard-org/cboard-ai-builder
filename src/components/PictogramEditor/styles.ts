import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  outlinedBox: {
    backgroundColor: 'grey[100]',
    borderRadius: 2,
    border: 0.5,
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content',
    flexShrink: 0,
    minHeight: '26%',
    boxSizing: 'content-box',
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
  pictogramEditorContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: { xs: 'space-evenly', sm: 'space-between' },
    gap: 2,
  },
  morePictosButton: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 2,
  },
  searchResults: {
    height: '100%',
  },
} satisfies Record<string, SxProps>;
