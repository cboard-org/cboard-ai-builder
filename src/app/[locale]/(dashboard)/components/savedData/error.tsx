'use client';
import ErrorAndReset from '@/components/ErrorAndReset/ErrorAndReset';
import { useRouter } from 'next/navigation';

export default function ErrorContainer() {
  const router = useRouter();
  const reset = () => router.refresh();
  return <ErrorAndReset reset={reset} />;
}
