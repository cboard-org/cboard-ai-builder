import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 1.5,
    px: 2,
    mb: 0.5,
    flexShrink: 0,
    mx: '12px',
    borderRadius: 1,
  },
  headerLeftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
  },
  introductionTitle: {
    fontSize: { xs: '24px', sm: '48px' },
    textAlign: 'center',
    lineHeight: { xs: '32px', sm: '56px' },
  },
  title: {
    textTransform: 'uppercase',
    ml: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toolbar: { display: 'flex', justifyContent: 'end' },
  boardGridContainer: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  printTitle: {
    display: 'none',
  },
} satisfies Record<string, SxProps>;
