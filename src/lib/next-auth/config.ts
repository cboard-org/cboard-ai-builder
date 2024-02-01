import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { oauthLogin, credentialsLogin } from '@/lib/cboard-api/auth';
import { User } from '../cboard-api/types';
import { CboardUser, pickKeys } from './types';
import pick from 'lodash.pick';
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
  providers.push(
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
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
  return pick(user, pickKeys);
}

export default {
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
        } catch (e) {
          // TODO: send error message to client, you can throw an exception and the message will be sent to the client
          console.error(e);
          throw e;
        }
      },
    }),
    ...providers,
  ],
} satisfies AuthOptions;
