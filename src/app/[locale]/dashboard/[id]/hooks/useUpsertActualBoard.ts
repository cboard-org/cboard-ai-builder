import { useState, useMemo, useCallback } from 'react';
import { saveBoard, updateBoard } from '@/dashboard/@board/actions';
import { getErrorMessage } from '@/common/common';
import { useRouter } from '@/navigation';
import { useBoundStore } from '@/providers/StoreProvider';
import { BoardRecord } from '@/commonTypes/Board';
import { STASHED_CONTENT_ID } from '@/dashboard/constants';
import { usePathname } from '@/navigation';

export const useUpsertActualBoard = (): [
  boolean,
  boolean,
  (board: BoardRecord) => Promise<void>,
] => {
  const [isSaving, setisSaving] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isNewBoard = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === STASHED_CONTENT_ID;
  }, [pathname]);

  const setBoardIsUpToDate = useBoundStore((state) => state.setBoardIsUpToDate);
  const upsertBoard = useCallback(
    async (board: BoardRecord) => {
      try {
        setisSaving(true);

        const savedBoard = isNewBoard
          ? await saveBoard(board)
          : await updateBoard(board);
        setBoardIsUpToDate();
        if (isNewBoard) router.push(`/dashboard/${savedBoard.id}`);
      } catch (error) {
        console.error(getErrorMessage(error));
      }
      setisSaving(false);
    },
    [isNewBoard, router, setBoardIsUpToDate],
  );
  return [isSaving, isNewBoard, upsertBoard];
};
