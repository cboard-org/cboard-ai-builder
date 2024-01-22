import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
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

          if (!apiResponse.ok && user && user.message) {
            throw new Error(user.message);
          }

          console.log('User found:', user);
          if (apiResponse.ok && user) {
            return user;
          }
        } catch (e) {
          // TODO: send error message to client, you can throw an exception and the message will be sent to the client
          console.error(e);
          throw e;
        } finally {
          // Restore HTTPS check
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
        }
        return null;
      },
    }),
    ...providers,
  ],
} satisfies AuthOptions;
