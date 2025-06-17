'use client';
import Document from '@/components/Document'

function DocumentPage({ params: {id}} : {params: { id: string}}) {
  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <h1>let</h1>
            <Document id={id} />
    </div>
  )
}

export default DocumentPage