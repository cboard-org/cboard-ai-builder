import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
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
