'use client';

import { SessionProvider } from 'next-auth/react';

// This component wraps your application in NextAuth's SessionProvider
export default function NextAuthSessionProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
