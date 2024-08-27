import { useCallback } from 'react';
import { exportBoardToCboard } from './actions';
import { BoardRecord } from '@/commonTypes/Board';

export const useExportToCboard = () => {
  const onExport = useCallback(async (board: BoardRecord) => {
    if (!board) {
      console.error('No board to export');
      return;
    }
    try {
      const { url } = await exportBoardToCboard(board);
      if (url) {
        window.open(url, '_blank'); // Open in a new tab
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }, []);

  return { onExport };
};
