import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export default async function middleware(req : NextRequest, ev: any){

   try {
    console.log(process.env.CLERK_SECRET_KEY, 'sec key')
    console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, 'pub key')
    console.log('this is working with no error thrown')
    return await clerkMiddleware()(req, ev);
  } catch (err) {
    console.error('Middleware caught error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

