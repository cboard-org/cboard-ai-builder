import { createTheme } from '@mui/material/styles';

const getTheme = () =>
  createTheme({
    typography: {
      fontFamily: ['Montserrat', 'Roboto', 'Arial', 'sans-serif'].join(','),
    },
    cssVariables: { colorSchemeSelector: 'class' },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            main: '#7b1fa2',
            light: '#D7B3FF',
          },
          secondary: {
            main: '#7b1fa2',
            light: '#D7B3FF',
          },
          grey: {
            100: '#f5f5f5',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#D7B3FF',
            light: '#7b1fa2',
          },
          secondary: {
            main: '#7b1fa2',
            light: '#D7B3FF',
          },
          grey: {
            100: 'rgba(255, 255, 255, 0.09)',
          },
        },
      },
    },
  });

export default getTheme;
