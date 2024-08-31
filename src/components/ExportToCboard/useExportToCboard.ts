import { useCallback } from 'react';
import { generateURL } from './actions';
import { BoardRecord } from '@/commonTypes/Board';

export const useExportToCboard = () => {
  const onExport = useCallback(async (board: BoardRecord) => {
    if (!board) {
      console.error('No board to export');
      return;
    }
    try {
      const { URL } = await generateURL(board.id);
      if (URL) {
        window.open(URL, '_blank'); // Open in a new tab
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }, []);

  return { onExport };
};
