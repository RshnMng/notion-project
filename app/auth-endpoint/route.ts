import { NextRequest, NextResponse } from "next/server"
import { auth } from '@clerk/nextjs/server'
import { adminDb } from "@/firebase-admin";
import { getLiveBlocks } from '@/lib/liveblocks';

export async function POST(req: NextRequest) {
    auth.protect();
    const liveblocks = getLiveBlocks();
    const { sessionClaims } = await auth();
    const { room } = await req.json();

    if (!sessionClaims || !sessionClaims.email || !sessionClaims.fullName || !sessionClaims.image) {
  throw new Error('Missing session claim data');
}

    const session = liveblocks.prepareSession(sessionClaims.email, {
        userInfo: {
            name: sessionClaims.fullName,
            email: sessionClaims.email,
            avatar: sessionClaims.image
        }
    });

    const usersInRoom = await adminDb.collectionGroup('rooms').where('userId', '==', sessionClaims?.email).get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    console.log(room, 'room')

    if (userInRoom?.exists){
        session.allow(room, session.FULL_ACCESS);
        const { body, status } = await session.authorize();
        console.log('youre in this room')

        return new Response (body, { status })
    } else {
        return NextResponse.json( 
            { message : 'You are not in this room'},
            { status: 403 }
        )
    }


}
