'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';

export default function BoardPage() {
  const { displayInitialContent } = useBoundStore((state) => state);

  return displayInitialContent ? <InitialContent /> : <BoardContainer />;
}
