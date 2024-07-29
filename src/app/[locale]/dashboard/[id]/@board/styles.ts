import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export default {
  exampleButton: {
    width: '100%',
    p: 0,
  },
  textArea: {
    backgroundColor: 'white',
    color: 'black',
    pointerEvents: 'none',
    width: '100%',
    maxWidth: '250px',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 1.5,
    px: 2,
    mb: 0.5,
    flexShrink: 0,
  },
  headerLeftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: { flexGrow: 1, textTransform: 'uppercase', ml: 0 },
  toolbar: { display: 'flex', justifyContent: 'end' },
} satisfies Record<string, SxProps>;
