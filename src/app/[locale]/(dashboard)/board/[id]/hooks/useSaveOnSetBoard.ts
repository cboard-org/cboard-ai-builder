import { BoardRecord } from '@/commonTypes/Board';
import { useBoundStore } from '@/providers/StoreProvider';
import { useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { updateBoard } from '../components/actions';
import { INITIAL_CONTENT_ID, STASHED_CONTENT_ID } from '../../../constants';
import { usePathname } from '@/navigation';
import { getErrorMessage } from '@/common/common';

function useSaveOnSetBoard(): [(board: BoardRecord) => void, boolean] {
  const [setBoard, setBoardIsUpToDate] = useBoundStore(
    useShallow((state) => [state.setBoard, state.setBoardIsUpToDate]),
  );
  const [isSaving, setisSaving] = useState(false);

  const pathname = usePathname();

  const isRemote = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId !== STASHED_CONTENT_ID && boardId !== INITIAL_CONTENT_ID;
  }, [pathname]);

  if (!isRemote) return [setBoard, isSaving];

  const setRemoteBoard = async (board: BoardRecord) => {
    setisSaving(true);
    try {
      setBoard(board);
      await updateBoard(board);
      setBoardIsUpToDate();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
    setisSaving(false);
  };
  return [setRemoteBoard, isSaving];
}

export default useSaveOnSetBoard;
