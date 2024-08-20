import { createTheme } from '@mui/material/styles';

const getTheme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'dark' ? '#D7B3FF' : '#7b1fa2',
        light: mode === 'dark' ? '#7b1fa2' : '#D7B3FF',
      },
      secondary: {
        main: '#7b1fa2',
        light: '#D7B3FF',
      },
      grey: { 100: mode === 'dark' ? 'rgba(255, 255, 255, 0.09)' : '#f5f5f5' },
    },
  });

export default getTheme;
