'use client';
import React from 'react';
import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';

function SidebarOption({href, id}: { href: string, id: string }) {

    const [ data, loading, error ] = useDocumentData(doc(db, 'documents', id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== '/';

    if ( !data ) return null;
    
    
  return (
    <Link href={href} className={`relative border p-2 m-2 rounded-md ${isActive ? 'bg-green-400 border-orange-500 border-2 text-orange-800 font-bold' : 'bg-purple-200 border-purple-500 text-purple-400 font-bold ' }`}><p className='truncate'>{data.title}</p></Link>
  )
}

export default  SidebarOption 