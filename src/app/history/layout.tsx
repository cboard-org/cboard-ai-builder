'use client';
import { Box } from '@mui/material';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Box>{children}</Box>;
}
