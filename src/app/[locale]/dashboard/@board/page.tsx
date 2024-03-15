'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';

export default function BoardPage() {
  const { shouldDisplayInitialContent } = useBoundStore((state) => state);

  return shouldDisplayInitialContent ? <InitialContent /> : <BoardContainer />;
}
