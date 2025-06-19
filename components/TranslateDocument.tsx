'use client';
import * as Y from 'yjs'; 
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useState, useTransition, FormEvent } from 'react';
import { toast } from 'sonner';
import { BotIcon } from 'lucide-react';
import MarkDown from 'react-markdown';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Language = 

'english' |
'spanish' |
'portuguese' |
'french' |
'german' |
'mandarin' |
'cantonese' |
'arabic' |
'japanese' |
'hindi' |
'russian' |
'italian' 

const languages: Language[] = [ 

'english', 
'spanish' ,
'portuguese' ,
'french' ,
'german' ,
'mandarin' ,
'cantonese' ,
'arabic' ,
'japanese' ,
'hindi' ,
'russian' ,
'italian'
]

function TranslateDocument({ doc } : { doc: Y.Doc }) {
 const [ isOpen, setIsOpen ] = useState(false);
 const [ isPending, startTransition ] = useTransition();
 const [ language, setLanguage ] = useState('');
 const [ summary, setSummary ] = useState('');
 const [ question, setQuestion ] = useState('');
 
 
 const handleAskQuestion = async (e: FormEvent ) => {
        e.preventDefault();

        startTransition( async () => {
            console.log( process.env.NEXT_PUBLIC_BASE_URL, 'URL KEY')
            const documentData = doc.get('document-store').toJSON();

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`, {
              method: "POST",
              headers: {
                  "Content-Type": 'application/json',
              },
              body:  JSON.stringify({
                  documentData, 
                  targetLang: language
              })
            });

            if (res.ok){
              const {translated_text} = await res.json();
                setSummary(translated_text);
                toast.success('Translated Summary Successful!');
            }

            
        })
 }

  return (
     <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant='outline'>
  <DialogTrigger>Translate</DialogTrigger>
  </Button>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center'>Translate this document</DialogTitle>
      <DialogDescription className='text-center'>
         Select a Language and AI will translate a summary of the document in the selected language.
      </DialogDescription>


      <hr className='mt-5'></hr>

      {question && <p className='mt-5 text-grey-500'>Q: {question}</p>}
    </DialogHeader>

    {summary && 
      <div className='flex flex-col items-starrt max-h-36 overflow-y-scroll gap-2 p-5 bg-gray-100'>
          <div className='flex'>
            <BotIcon className='w-10 flex-shrink-0'/>
            <p className='font-bold'>GPT {isPending ? 'is thinking...' : 'Says:'}</p>
          </div>
          <p>{isPending ? 'Thinking...' : <MarkDown>{summary}</MarkDown>}</p>
      </div>
    }


    <form onSubmit={handleAskQuestion} className="flex gap-2">
         <Select value={language} onValueChange={(value) => setLanguage(value)}>
           <SelectTrigger className="w-[180px]">
           <SelectValue placeholder="Theme" />
           </SelectTrigger>
           <SelectContent>
              { languages.map((language) => {
                return <SelectItem key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </SelectItem>
              })}
           </SelectContent>
        </Select>
            <Button type='submit' disabled={!language || isPending }>{isPending ? 'Translating...' : 'Translate'}</Button>

    </form>
  </DialogContent>
  
</Dialog>
  )
}

export default TranslateDocument 