'use client';

import React from 'react'
import NewDocumentButton from './NewDocumentButton';
import { MenuIcon } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'; 
import { db } from '@/firebase';
import { useEffect, useState} from 'react';
import  SidebarOption  from './SidebarOption';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface RoomDocument extends DocumentData {
    createdAt: string,
    role: 'owner' | 'editor',
    roomId: string,
    userId: string,
}

function Sidebar() {
    const { user } = useUser();
    const [ groupedData, setGroupedData ] = useState<{
        owner: RoomDocument[];
        editor : RoomDocument[];
    }>({
        owner: [],
        editor: [],
      })

    const [ data, loading, error ] = useCollection((
        user && ( 
            query(collectionGroup( db, 'rooms'), where('userId', '==', user.emailAddresses[0].toString()))
        )
    ));

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce<{
            owner: RoomDocument[];
            editor: RoomDocument[];
    }>(
        (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === 'owner') {
            acc.owner.push({
                id: curr.id,
                ...roomData 
            });
        } else {
            acc.editor.push({
                id: curr.id,
                ...roomData
            });
        }
        return acc;
        
    }, {
        owner: [],
        editor: []
    })

    setGroupedData(grouped)


    }, [data])

    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className='flex flex-col space-y-4 '>

            {groupedData.owner.length === 0 ? <p className='text-green-500'>No documents found</p> : 
             groupedData.owner.map((doc) => {
                return  <SidebarOption  key={doc.id} id={doc.id} href={`/doc/${doc.id}`} type='owner'/>
                      
             })}

             </div>
             {/* {shared with me} */}
                
             {groupedData.editor.length > 0 && (


                    <>
                        <h2 className='text-gray-500 font-semibold text-sm'>Shared with Me</h2>
                        <div className='flex flex-col space-y-4'>
                        {groupedData.editor.map((doc) => {
                           return <SidebarOption key={doc.id}  id={doc.id} href={`/doc/${doc.id}`} type='editor'/>
                        })}
                        </div>
                    </>
             )}


             {/* {list} */}
        </>
    )
  return (
    <>
    <div className='p-2 md:p-5 bg-teal-200 relative'>
        <div className='md:hidden'>
            <Sheet>
                <SheetTrigger>
                    <MenuIcon />
                </SheetTrigger>
            
                <SheetContent side='left'>
                  <div>
                       {menuOptions}
                 </div>
                </SheetContent>
            </Sheet>
        </div>



            <div className='hidden md:inline'>
                {menuOptions}
            </div>
    </div>
    </>
  )
}

export default Sidebar