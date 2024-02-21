import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const styles = {
  button: {
    color: '#2B2B2B',
    fontWeight: 500,
    backgroundColor: '#FFFFFF',
    borderColor: '#0000003B',
    borderWidth: '1px',
    textTransform: 'initial',
    pr: '16px',
    py: '8px',
    '&:hover': {
      borderColor: '#2B2B2B',
    },
  },
  iconContainer: {
    display: 'flex',
    height: '100%',
    alignContent: 'center',
    alignSelf: 'center',
    borderRight: '1px #0000003B solid',
    pr: '12px',
    py: '3px',
  },
  textContainer: { width: '100%' },
  hiddenIcon: { visibility: 'hidden' },
} satisfies Record<string, SxProps>;
