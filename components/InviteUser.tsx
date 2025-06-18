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
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { Input } from "./ui/input";
import { FormEvent } from "react";
import { InviteUserToDocument } from '@/actions/actions';


function InviteUser() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPending, startTransition ] = useTransition();
    const pathname = usePathname();
    const router = useRouter();
    const [email, setEmail ]  = useState('');

    const handleInvite = async (e: FormEvent) => {
          e.preventDefault();

          const roomId = pathname.split('/').pop();
          if(!roomId) return;

          startTransition( async () => {
            const { success } = await InviteUserToDocument(roomId, email);

            console.log(success, 'sucess')


            if ( success ) {
                setIsOpen(false);
                setEmail('')
                toast.success('Added User Successfully')
            }else {
                toast.error( 'Failed to Add User')
            }
          })
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='outline'>
  <DialogTrigger>Invite</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center'>Invite User to Collaborate!</DialogTitle>
      <DialogDescription className='text-center'>
         Enter the email of the user you want to share with.
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={handleInvite} className="flex gap-2">
        <Input type='email' placeholder='Email' className="w-full" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Button type='submit' disabled={!email || isPending }>{isPending ? 'Inviting...' : 'Invite'}</Button>

    </form>
  </DialogContent>
  
</Dialog>
  )
}


export default InviteUser