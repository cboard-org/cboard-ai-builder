import { useMemo } from 'react';
import { usePathname } from '@/navigation';
import {
  INITIAL_CONTENT_ID,
  STASHED_CONTENT_ID,
} from '@/app/[locale]/(dashboard)/constants';

function useIsRemoteContentView() {
  const pathname = usePathname();

  const isRemote = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId !== STASHED_CONTENT_ID && boardId !== INITIAL_CONTENT_ID;
  }, [pathname]);

  return isRemote;
}

export default useIsRemoteContentView;
