'use client';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import { useTranslations } from 'next-intl';
import { useExportToCboard } from './useExportToCboard';
import { useBoundStore } from '@/providers/StoreProvider';

export default function ExportToCboard() {
  const message = useTranslations('Board.BoardContainer');
  const board = useBoundStore((state) => state.board);
  const { onExport } = useExportToCboard();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<NorthEast />}
      sx={{ fontSize: '0.7rem' }}
      onClick={() => board && onExport(board)}
    >
      {message('exportToCboard')}
    </Button>
  );
}
