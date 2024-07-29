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
  initialContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 2,
    height: '100%',
    gap: 2,
  },
  brandIcon: { fontSize: { xs: 35, md: 55 } },
  examplesContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '900px',
  },
  title: { flexGrow: 1, textTransform: 'uppercase', ml: 0 },
  toolbar: { display: 'flex', justifyContent: 'end' },
  boardGridContainer: {
    overflow: 'auto',
    flexGrow: 1,
    display: 'flex',
  },
} satisfies Record<string, SxProps>;
