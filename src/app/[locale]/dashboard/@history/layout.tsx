import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const message = useTranslations('History');
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          {message('title')}
        </AccordionSummary>
        {children}
      </Accordion>
    </Box>
  );
}
