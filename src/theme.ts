'use client';
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    custom: {
      filledBackground: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      filledBackground?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#7b1fa2',
      light: '#D7B3FF',
    },
    custom: {
      filledBackground: 'rgba(0, 0, 0, 0.06)',
    },
  },
});

export default theme;
