import { SxProps, Theme } from '@mui/system';

export const styles = {
  paper: { mx: { md: 5, xs: 1 }, mt: 1 },
  avatar: { bgcolor: (theme) => theme.palette.primary.light },
  formControl: { m: 1, minWidth: 120 },
} satisfies Record<string, SxProps<Theme>>;
