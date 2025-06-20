'use client';

import { ClerkProvider } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;



export function Providers({children} : {children: React.ReactNode}) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
        {children}
    </ClerkProvider>
  )
}

