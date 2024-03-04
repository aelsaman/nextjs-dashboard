import type { NextAuthConfig } from 'next-auth';

// auth config for the frontend NextJS on the browser

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  //
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // this middleware for next-auth is not being triggered !!! 
      console.log('isLoggedIn auth.config ====>> ', isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
