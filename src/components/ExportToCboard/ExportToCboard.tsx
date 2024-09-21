'use client';
import Button from '@mui/material/Button';
import NorthEast from '@mui/icons-material/NorthEast';
import { useTranslations } from 'next-intl';
import styles from './styles';
import { useExportToCboard } from './useExportToCboard';
import { useBoundStore } from '@/providers/StoreProvider';
import { useUpsertActualBoard } from '@/board/hooks/useUpsertActualBoard';
import { BoardRecord } from '@/commonTypes/Board';

export default function ExportToCboard() {
  const message = useTranslations('Board.BoardContainer');
  const board = useBoundStore((state) => state.board);
  const { onExport } = useExportToCboard();
  const { upsertBoard } = useUpsertActualBoard();

  const handleExport = async (board: BoardRecord) => {
    const savedBoard = await upsertBoard(board);
    if (!savedBoard) return;
    await onExport(savedBoard);
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<NorthEast />}
      sx={styles.exportButton}
      onClick={() => board && handleExport(board)}
    >
      {message('exportToCboard')}
    </Button>
  );
}
