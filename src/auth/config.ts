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
      async authorize(credentials) {
        // TODO: find a way to make this work without affecting this env var or
        // connecting to external APIs without issues from our local

        // To work on localhost we need to disable the HTTPS cert check
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        console.log(`${process.env.NEXT_PUBLIC_API_URL!}user/login`);
        console.log(credentials);
        try {
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

          const user = await apiResponse.json();
          console.log(user);
          if (apiResponse.ok && user) {
            return user;
          }
        } catch (e) {
          // TODO: send error message to client
          console.error(e);
          return null;
        } finally {
          // Restore HTTPS check
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
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
