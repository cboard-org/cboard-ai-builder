import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function useIsSmallScreen() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
}
