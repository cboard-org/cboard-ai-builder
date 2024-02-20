import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const styles = {
  checkCircle: {
    color: '#1976d2',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.7)',
    width: '32px',
    height: '32px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '10px',
    border: '2px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: '50%',
  },
} satisfies Record<string, SxProps>;
