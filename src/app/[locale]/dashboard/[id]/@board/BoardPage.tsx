'use client';
import InitialContent from './InitialContent';
import BoardContainer from './BoardContainer';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';

export default function BoardPage() {
  const shouldDisplayInitialContent = useBoundStore(
    useShallow((state) => state.shouldDisplayInitialContent),
  );
  return shouldDisplayInitialContent ? <InitialContent /> : <BoardContainer />;
}
