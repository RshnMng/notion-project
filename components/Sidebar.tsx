import React from 'react'
import NewDocumentButton from './NewDocumentButton';
import { MenuIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

function Sidebar() {

    const menuOptions = (
        <>
            <NewDocumentButton />
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