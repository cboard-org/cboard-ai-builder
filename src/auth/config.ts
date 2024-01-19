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
