'use client';

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

function Header() {

    const { user } = useUser();
  return (
    <div className="flex items-center justify-between p-5 bg-pink-300 relative">
        { user && <h1 className="text-2xl">{user?.firstName}{`'s`} Workstation</h1>}

    

    <div>
        <SignedIn>
                <UserButton />
        </SignedIn>

        <SignedOut>
                <SignInButton />
        </SignedOut>
    </div>
    </div>
  )
}
 
export default Header