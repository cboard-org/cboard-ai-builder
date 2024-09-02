'use client'; // This directive ensures the component is treated as a client component

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import getTheme from '@/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = getTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <InitColorSchemeScript attribute="class" />
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
