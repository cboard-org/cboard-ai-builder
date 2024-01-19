import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'text', label: 'Email' },
        password: { type: 'password', label: 'Password' },
      },
      authorize(credentials) {
        if (
          credentials?.email === 'admin' &&
          credentials.password === 'admin'
        ) {
          return { id: '1', name: 'admin' };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_ID!,
      clientSecret: process.env.GOOGLE_APP_SECRET!,
    }),
    FacebookProvider({
      clientId: '',
      clientSecret: '',
    }),
    AppleProvider({
      clientId: '',
      clientSecret: '',
    }),
  ],
} satisfies AuthOptions;
