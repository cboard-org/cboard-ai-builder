import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  savedDataContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  tabs: {
    mb: 1,
  },
  tabPanelSection: {
    overflow: 'auto',
  },
} satisfies Record<string, SxProps>;
