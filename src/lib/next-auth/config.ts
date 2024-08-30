import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { oauthLogin, credentialsLogin } from '@/lib/cboard-api/auth';
import { User } from '../cboard-api/types';
import { CboardUser, PICK_KEYS } from './types';
import pick from 'lodash.pick';
import { getErrorMessage } from '../../common/common';
const providers = [];

if (process.env.GOOGLE_APP_ID && process.env.GOOGLE_APP_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_ID,
      clientSecret: process.env.GOOGLE_APP_SECRET,
    }),
  );
}
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  // Solution from https://github.com/nextauthjs/next-auth/discussions/4146#discussioncomment-7603759
  providers.push(
    FacebookProvider({
      idToken: true,
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      authorization: {
        url: 'https://www.facebook.com/v11.0/dialog/oauth',
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          scope: 'openid email',
          response_type: 'code',
        },
      },
      token: {
        url: 'https://graph.facebook.com/oauth/access_token',
        async request(context) {
          const url =
            `https://graph.facebook.com/oauth/access_token` +
            `?code=${context.params.code}` +
            `&client_id=${context.provider.clientId}` +
            `&redirect_uri=${context.provider.callbackUrl}` +
            `&client_secret=${context.provider.clientSecret}`;
          const response = await fetch(url);
          const tokens = await response.json();
          return { tokens };
        },
      },
    }),
  );
}

if (process.env.APPLE_APP_CLIENT_ID && process.env.APPLE_KEY_ID) {
  providers.push(
    AppleProvider({
      clientId: process.env.APPLE_APP_CLIENT_ID,
      clientSecret: process.env.APPLE_KEY_ID,
    }),
  );
}

function omitUserPropsForSession(user: User): CboardUser {
  return pick(user, PICK_KEYS);
}

export default {
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async session({ session, token }) {
      // Persisting cboard API user data on backend too
      session.cboard_user = token.cboard_user;
      return session;
    },
    async jwt({ account, token, user, profile }) {
      // Signin
      if (account && user && account.type == 'credentials' && user) {
        token.cboard_user = omitUserPropsForSession(user as User);
      }
      if (account && profile && account.type == 'oauth') {
        const oauthResponse = await oauthLogin(profile, account);
        token.cboard_user = omitUserPropsForSession(oauthResponse);
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        try {
          const user = await credentialsLogin(credentials);
          return user;
        } catch (error) {
          console.error(getErrorMessage(error));
          throw error;
        }
      },
    }),
    ...providers,
  ],
} satisfies AuthOptions;
