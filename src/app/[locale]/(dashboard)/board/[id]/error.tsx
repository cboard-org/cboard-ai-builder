'use client'; // Error components must be Client Components

import { useRouter } from '@/navigation';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { INITIAL_CONTENT_ID } from '@/app/[locale]/(dashboard)/constants';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('err', error);
    setTimeout(() => {
      router.push(`/board/${INITIAL_CONTENT_ID}`);
    }, 2000);
  }, [error, router]);

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h1 style={{ color: 'red' }}>ERROR</h1>
      <p>{error.message}</p>
      <p>you will be redirected to the initial page</p>
    </Box>
  );
}
