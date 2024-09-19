import { useMemo } from 'react';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';

function useIsStashedContentView() {
  const pathname = usePathname();

  const isStashedContentView = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === STASHED_CONTENT_ID;
  }, [pathname]);

  return isStashedContentView;
}

export default useIsStashedContentView;
