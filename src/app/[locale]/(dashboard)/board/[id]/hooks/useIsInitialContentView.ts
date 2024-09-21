import { useMemo } from 'react';
import { usePathname } from '@/navigation';
import { INITIAL_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';

function useIsInitialContentView() {
  const pathname = usePathname();

  const isInitialContentView = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === INITIAL_CONTENT_ID;
  }, [pathname]);

  return isInitialContentView;
}

export default useIsInitialContentView;
