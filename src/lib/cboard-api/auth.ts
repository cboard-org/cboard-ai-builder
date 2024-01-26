import { Account, Profile } from 'next-auth';
import { User } from './types';

/**
 * Sign in a user with credentials
 * @throws Error on fetch error
 * @param credentials
 * @returns
 */
export async function credentialsLogin(
  credentials: Record<'email' | 'password', string>,
): Promise<User> {
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}user/login`,
    {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  if (!apiResponse.ok) {
    // TODO: error messages in UI
    throw new Error('TODO: error messages in UI');
  }

  const user = await apiResponse.json();
  return user;
}

/**
 * Sends oauth data Cboard API to create/update user
 * @param profile
 * @param account
 * @throws Error on fetch error
 * @returns
 */
export async function oauthLogin(
  profile: Profile,
  account: Account,
): Promise<User> {
  const payload = {
    profile: {
      id: profile.sub,
      displayName: profile.name,
      name: profile.name,
      lastName: profile.name,
      email: profile.email,
      emails: [
        {
          value: profile.email,
        },
      ],
      photos: [
        {
          value: profile.image,
        },
      ],
    },
    accessToken: account.access_token,
    refreshToken: account.refresh_token,
  };
  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}login/oauth/${account.provider}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  if (!apiResponse.ok) {
    // TODO: error messages in UI
    throw new Error('TODO: error messages in UI');
  }

  const jsonResp = (await apiResponse.json()) as User;
  return jsonResp;
}
