'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {useState, useTransition } from 'react';
import { Button } from './ui/button';
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from 'sonner';


function DeleteDocument() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPending, startTransition ] = useTransition();
    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
          const roomId = pathname.split('/').pop();
          if (!roomId) return;

          startTransition( async () => {
            await deleteDocument(roomId)

            const { success } = await deleteDocument(roomId);

            console.log(success, 'sucess')


            if ( success ) {
                setIsOpen(false);
                router.replace('/');
                toast.success('Room Deleted Successfully')
            }else {
                toast.error( 'Failed to delete room')
            }
          })
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='destructive'>
  <DialogTrigger>Delete</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently remove this document from our servers and remove all the users from this file.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className='sm:justify-end gap-2'>
      <Button type='button' variant='destructive' onClick={handleDelete} disabled={isPending}>{isPending? 'Deleting..' : 'Delete'}</Button>
      <Button type='button' onClick={() => setIsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
  
</Dialog>
  )
}

export default DeleteDocument