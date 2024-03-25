import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '@/firebase-app';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

// auth config for the backend NodeJS API

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  basePath: '/auth',
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
      // async authorize(credentials) {
      //   const parsedCredentials = z
      //     .object({ email: z.string().email(), password: z.string().min(6) })
      //     .safeParse(credentials);

      //   if (parsedCredentials.success) {
      //     const { email, password } = parsedCredentials.data;
      //     // firebase login handler
      //     return await signInWithEmailAndPassword(firebaseAuth, email, password)
      //       .then((userCredentials) => {
      //         if (userCredentials.user) {
      //           console.log(
      //             'userCredentials from firebase ... ',
      //             userCredentials,
      //           );
      //           return userCredentials.user;
      //         }
      //         return null;
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         return null;
      //       });
      //   }

      //   return null;
      // },
    }),
  ],
});
