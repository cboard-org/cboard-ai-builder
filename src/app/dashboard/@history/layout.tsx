'use client';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionSummary, Box } from '@mui/material';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {/* TODO: internationalization */}
          History
        </AccordionSummary>
        {children}
      </Accordion>
    </Box>
  );
}
