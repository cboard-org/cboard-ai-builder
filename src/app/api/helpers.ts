import { headers } from 'next/headers';

export function validateBearerToken(): boolean {
  const headersList = headers();
  const token = headersList.get('Authorization')?.split(' ')[1] || '';

  return token === process.env.INTERNAL_API_KEY;
}
