import { Account, Profile } from 'next-auth';
import { User } from './types';

// TODO: Make this connector to be separated from any other component
// Currently it is importing types from 'next-auth', ideally this functions shouldn't rely on
// external services.
// Basically no imports should come from something that's an external service
// not related to cboard-api

const LOGIN_ERROR_CODE = 'loginError';

/**
 * Sign in a user with credentials
 * @throws Error on fetch error
 * @param credentials
 * @returns
 */
export async function credentialsLogin(
  credentials: Record<'email' | 'password', string>,
): Promise<User> {
  const apiResponse = await fetch(`${process.env.CBOARD_API_URL!}user/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!apiResponse.ok) {
    console.error(
      `Credential login response: ${apiResponse.status} for account ${credentials.email}`,
    );
    throw new Error(LOGIN_ERROR_CODE);
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
    `${process.env.CBOARD_API_URL!}login/oauth/${account.provider}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
      },
    },
  );
  if (!apiResponse.ok) {
    console.error(
      `Something went wrong after oauth after calling login/oauth/${account.provider} in cboard API ${apiResponse.status}`,
    );
    throw new Error(LOGIN_ERROR_CODE);
  }

  const jsonResp = (await apiResponse.json()) as User;
  return jsonResp;
}
