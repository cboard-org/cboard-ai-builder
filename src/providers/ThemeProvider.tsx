'use client'; // This directive ensures the component is treated as a client component

import React, { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from '@mui/material';
import getTheme from '@/theme';
import { useBoundStore } from './StoreProvider';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Detect the system preference for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const storeTheme = useBoundStore((state) => state.theme);
  const colorTheme =
    storeTheme !== 'auto' ? storeTheme : prefersDarkMode ? 'dark' : 'light';
  const theme = useMemo(() => getTheme(colorTheme), [colorTheme]);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
