'use client';
import { useBoundStore } from '@/providers/StoreProvider';
import { useEffect, useState } from 'react';

const useOnLocationPathnameChangeHandler = ({}) => {
  const [id, setId] = useState('');
  useEffect(() => {
    window.addEventListener('popstate', () => {
      const splited = document.location.pathname.split('/');
      setId(splited[splited.length - 1]);
    });
    return () => {
      window.removeEventListener('popstate', () => {});
    };
  }, []);
  return id;
};

const useSetDashboardIdOnChange = ({ idParam }: { idParam: string }) => {
  const { setDashboardId } = useBoundStore((state) => state);
  const idFromPathnameChangeHandler = useOnLocationPathnameChangeHandler({});

  useEffect(() => {
    setDashboardId(idParam);
  }, [idParam, setDashboardId]);

  useEffect(() => {
    if (idFromPathnameChangeHandler.length > 0) {
      setDashboardId(idFromPathnameChangeHandler);
    }
  }, [idFromPathnameChangeHandler, setDashboardId]);
};

export default function DashboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  useSetDashboardIdOnChange({ idParam: id });

  return <></>;
}
