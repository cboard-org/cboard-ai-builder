import { useState, useMemo, useCallback } from 'react';
import {
  saveBoard,
  updateBoard,
} from '@/app/[locale]/(dashboard)/board/[id]/components/actions';
import { getErrorMessage } from '@/common/common';
import { useRouter } from '@/navigation';
import { useBoundStore } from '@/providers/StoreProvider';
import { BoardRecord } from '@/commonTypes/Board';
import { STASHED_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';
import { usePathname } from '@/navigation';

export const useUpsertActualBoard = (): {
  isSaving: boolean;
  isNewBoard: boolean;
  error: boolean;
  upsertBoard: (board: BoardRecord) => Promise<BoardRecord | null>;
} => {
  const [isSaving, setisSaving] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const isNewBoard = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === STASHED_CONTENT_ID;
  }, [pathname]);

  const setBoardIsUpToDate = useBoundStore((state) => state.setBoardIsUpToDate);
  const upsertBoard = useCallback(
    async (board: BoardRecord): Promise<BoardRecord | null> => {
      setError(false);
      try {
        setisSaving(true);

        const savedBoard = isNewBoard
          ? await saveBoard(board)
          : await updateBoard(board);
        setBoardIsUpToDate();
        if (isNewBoard) router.push(`/board/${savedBoard.id}`);
        return savedBoard;
      } catch (error) {
        console.error(getErrorMessage(error));
        setError(true);
      } finally {
        setisSaving(false);
      }
      return null;
    },
    [isNewBoard, router, setBoardIsUpToDate],
  );
  return { isSaving, isNewBoard, error, upsertBoard };
};
