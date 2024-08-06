import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import theme from '../../theme';

export const styles = {
  paper: { mx: { md: 5, xs: 1 }, mt: 1 },
  avatar: { bgcolor: theme.palette.primary.light },
  formControl: { m: 0, minWidth: 90 },
} satisfies Record<string, SxProps>;
