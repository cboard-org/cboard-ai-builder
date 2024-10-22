import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const styles = {
  dialogTitle: { pb: 2 },
  dialogForgotPasswordContainer: { px: 2, pb: 2 },

  button: {
    backgroundColor: { xs: 'transparent' },
    borderColor: { xs: '#7b1fa2' },
    color: { xs: '#7b1fa2' },
  },
} satisfies Record<string, SxProps>;
