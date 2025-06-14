'use client'
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import  useOwner  from '@/lib/useOwner'

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
        <div>
                <div className='flex max-w-6xl mx-auto justify-between'>
                        <form className='flex space-x-2' onSubmit={updateTitle}>
                            {/* update title */}
                            <Input value={input} onChange={ (e) => setInput(e.target.value)} />
                            <Button disabled={isUpdating} type='submit' >{isUpdating ? `Updating...` : 'Update' }</Button>
                            {/* if owner => invite user and delete document*/}
                        </form>
                </div>

                <div>
                 {/* {manage users} */}

                 {/* Avatars */}
                </div>


                 {/* collabrative editor */}

    </div>
)}

export default Document