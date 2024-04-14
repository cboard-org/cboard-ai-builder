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
    gridTemplateColumns: '1fr 1fr 1fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 1.5,
    mb: 0.5,
  },
  headerLeftSide: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
  },
  title: { flexGrow: 1, textTransform: 'capitalize' },
  toolbar: { display: 'flex', justifyContent: 'end' },
} satisfies Record<string, SxProps>;
