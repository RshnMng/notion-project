'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState } from 'react';
import { Button } from './ui/button';


function DeleteDocument() {
    const [ isOpen, setIsOpen ] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='destructive'>
  <DialogTrigger>Delete</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers and all the users from this file.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
  
</Dialog>
  )
}

export default DeleteDocument