'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';

export default function BoardPage() {
  const { showInitialContent } = useBoundStore((state) => state);

  //return <InitialContent />;
  return showInitialContent ? <InitialContent /> : <BoardContainer />;
}
