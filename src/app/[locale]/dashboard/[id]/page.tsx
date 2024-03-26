'use client';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect, useState } from 'react';

const useOnLocationPathnameChangeHandler = () => {
  const setDashboardId = useBoundStore((state) => state.setDashboardId);

  const [id, setId] = useState('');
  useEffect(() => {
    window.addEventListener('popstate', () => {
      const splited = document.location.pathname.split('/');
      if (splited.length > 0) {
        setDashboardId(splited[splited.length - 1]);
      }
    });
    return () => {
      window.removeEventListener('popstate', () => {});
    };
  }, [setDashboardId]);
  return { idFromPathnameChangeHandler: id, setIdToPathChangeHandler: setId };
};

const useSetDashboardIdOnChange = ({ idParam }: { idParam: string }) => {
  const setDashboardId = useBoundStore((state) => state.setDashboardId);
  useOnLocationPathnameChangeHandler();

  useEffect(() => {
    setDashboardId(idParam);
  }, [idParam, setDashboardId]);
};

export default function DashboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  useSetDashboardIdOnChange({ idParam: id });

  return <></>;
}
