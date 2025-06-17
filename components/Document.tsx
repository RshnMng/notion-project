'use client'
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import  useOwner  from '@/lib/useOwner'
import Editor from './Editor';

function Document({id} : {id: string}) {
    const [input, setInput ]  = useState('check it out');
    const [isUpdating, startTransition ] = useTransition();
    const [data, loading, error ] = useDocumentData(doc(db, 'documents', id));
    const isOwner = useOwner()

    useEffect(() => {
        if (data ) {
            setInput(data.title)
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition( async () => {
                await updateDoc(doc(db, 'documents', id), { title: input })
            })
        }
    }
  return (
        <div className='flex-1 h-full p-5'>
                <div className='flex max-w-6xl mx-auto justify-between'>
                        <form className='flex space-x-2 flex-1' onSubmit={updateTitle}>
                            {/* update title */}
                            <Input value={input} onChange={ (e) => setInput(e.target.value)} className='bg-white font-bold text-green-700 text-center max-w-2xl' />
                            <Button disabled={isUpdating} type='submit' >{isUpdating ? `Updating...` : 'Update' }</Button>                                   
                            {/* if owner => invite user and delete document*/}

                            { isOwner && <p>check it out</p>}
                        </form>
                </div>

                <div>
                 {/* {manage users} */}

                 {/* Avatars */}
                </div>


                 {/* collabrative editor */}
                <Editor />
    </div>
)}

export default Document