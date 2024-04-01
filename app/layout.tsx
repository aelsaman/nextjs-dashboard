import React from 'react';
import { SessionProvider as AuthSessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { inter } from '@/app/ui/fonts';

import '@/app/ui/global.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // console.log('auth() data ..... ', session);
  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
