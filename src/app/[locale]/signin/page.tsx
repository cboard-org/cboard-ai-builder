import { getProviders } from 'next-auth/react';
import authOptions from '@/lib/next-auth/config';
import { redirect } from '@/navigation';
import { getServerSession } from 'next-auth';
import { DEFAULT_CALLBACK_URL } from './constants';
import Signin from './Signin';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<JSX.Element | unknown> {
  const session = await getServerSession(authOptions);
  const authProviders = await getProviders();
  if (session) {
    let callbackUrl = DEFAULT_CALLBACK_URL;
    if (
      'callbackUrl' in searchParams &&
      typeof searchParams['callbackUrl'] == 'string'
    ) {
      callbackUrl = searchParams['callbackUrl'];
    }
    redirect(callbackUrl);
    return;
  }

  let errorMessage = '';
  if ('error' in searchParams && typeof searchParams['error'] == 'string') {
    errorMessage = searchParams['error'];
  }
  return <Signin errorMessage={errorMessage} authProviders={authProviders} />;
}
