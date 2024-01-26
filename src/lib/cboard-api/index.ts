import { Account, Profile } from 'next-auth';
import { User } from './types';

/**
 * Sends oauth data Cboard API to create/update user
 * @param profile
 * @param account
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
    `${process.env.NEXT_PUBLIC_API_URL!}login/passport/${account.provider}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json',
      },
    },
  );

  const jsonResp = (await apiResponse.json()) as User;
  return jsonResp;
}
