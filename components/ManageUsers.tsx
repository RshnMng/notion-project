'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState, useTransition } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { removeUserFromDocument } from '@/actions/actions';
import { useUser } from "@clerk/nextjs";
import  useOwner  from '@/lib/useOwner';
import { useRoom } from '@liveblocks/react/suspense';
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { query, collectionGroup, where } from 'firebase/firestore'; 


function ManageUsers() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPending, startTransition ] = useTransition();
    const { user } = useUser();
    const isOwner = useOwner();
    const room = useRoom();
    const [usersInRoom ]  = useCollection(
        user && query(collectionGroup(db, 'rooms'), where('roomId', '==', room.id))
    )

    if(!user) return;

    console.log(user, 'user')

    const handleDelete = (userId: string) => {
          startTransition( async () => {
              if(!user) return;

              const success = await removeUserFromDocument(room.id, userId)
            if ( success ) {
                setIsOpen(false);
                toast.success('User Removed Successfully')
            }else {
                toast.error( 'Failed to Remove User')
            }
          })
    }

    

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='outline'>
  <DialogTrigger>Users {usersInRoom?.docs.length}</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center'>Users with Access</DialogTitle>
      <DialogDescription className='text-center'>
         List of users who have access to this document:
      </DialogDescription>
    </DialogHeader>
    <hr className='my-2'/>
            <div className=" flex flex-col space-y-2">
              {
              usersInRoom?.docs.map((doc) => {
                return <div key={doc.data().userId} className='flex items-center justify-between'>
                        <p className='font-light'>
                            {doc.data().userId === user.emailAddresses[0].toString() ? 
                            `You (${ doc.data().userId })` : doc.data().userId }
                        </p>

                        <div className='flex items-center gap-2'>
                            <Button variant='outline'>{doc.data().role}</Button>
                        </div>

                        {isOwner  && 
                            doc.data().userId !== user?.emailAddresses[0].toString() && (
                                <Button variant='destructive' onClick={() => handleDelete(doc.data().userId)}
                                     disabled={isPending} size='sm' > {isPending ? 'Removing' : 'Delete'} </Button>
                                
                            )
                        }
                </div>
              })
              }
            </div>
  </DialogContent>
  
</Dialog>
  )
}


export default ManageUsers