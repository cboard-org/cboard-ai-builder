'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';

export default function BoardPage() {
  const { showInitialBoard } = useBoundStore((state) => state);

  //return <InitialContent />;
  return showInitialBoard ? <InitialContent /> : <BoardContainer />;
}
