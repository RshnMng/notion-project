import { auth } from '@clerk/nextjs/server'
import RoomProvider from '@/components/RoomProvider';

function Doclayout({ children, params: { id } } : { children : React.ReactNode, params : { id : string } } ) {
    auth.protect();
  return (
    <RoomProvider roomId={id}> {children} </RoomProvider>
  )
}

export default Doclayout