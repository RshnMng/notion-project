import { auth } from '@clerk/nextjs/server'
import RoomProvider from '@/components/RoomProvider';

function Doclayout({ children, params: { id } } : { children : React.ReactNode, params : { id : string } } ) {
    auth.protect();
  return (
    <>
    <h1>check mate</h1>
    <RoomProvider roomId={id}>
       {children} 
       <h1>working</h1>
       </RoomProvider>
    </>
  )
}

export default Doclayout