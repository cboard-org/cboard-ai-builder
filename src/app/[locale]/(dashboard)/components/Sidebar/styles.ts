import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const drawerWidth = 310; // Adjust this value as needed
const paddings = { xs: 1, md: 2 };
const borderRadius = 4;

export default {
  drawer: {
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      backgroundColor: 'primary',
      borderRight: '0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      py: paddings,
      pl: paddings,
      pr: { xs: 1, md: 0 },
    },
  },
  drawerTopBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    p: 1,
    flexShrink: 0,
    backgroundColor: 'grey.100',
    borderRadius,
  },
  controls: {
    minHeight: 0,
    px: 1,
    pb: 1,
    backgroundColor: 'grey.100',
    borderRadius,
  },
} satisfies Record<string, SxProps>;
