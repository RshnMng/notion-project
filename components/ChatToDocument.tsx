'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {useState, useTransition } from 'react';
import { Button } from './ui/button';
import * as Y from 'yjs';
import { toast } from 'sonner';
import { Input } from "./ui/input";
import { FormEvent } from "react";
import { MessageCircleCode, BotIcon } from "lucide-react";
import Markdown from 'react-markdown';


function ChatToDocument({ doc }: {doc: Y.Doc }) {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isPending, startTransition ] = useTransition();
    const [input, setInput ]  = useState('');
    const [summary, setSummary ]  = useState('');
    const [question, setQuestion]  = useState('');

    console.log(summary, 'summary')

    const handleAskQuestion = async (e: FormEvent) => {
      
          e.preventDefault();  

          setQuestion(input);

          startTransition( async () => {
              const documentData = doc.get('document-store').toJSON();

              const res = await fetch(`https://notion-cloudflare.rmng-developer-763.workers.dev/chatToDocument`, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                  documentData,
                  question: question
                })
              })

              if(res.ok) {
                  const { message } = await res.json();

                  setInput('');
                  setSummary(message);
                  toast.success('Question asked successfully!')
              }
          })

    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    {/* <Button asChild variant='outline'> */}
  <DialogTrigger>
    <MessageCircleCode className="mr-2"/>
  </DialogTrigger>
  {/* </Button> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-center'>Chat with the Document!</DialogTitle>
      <DialogDescription className='text-center'>
            Ask a question and chat with AI!
      </DialogDescription>

    <hr className='mt-5'/>

    </DialogHeader>

     {summary && 
      <div className='flex flex-col items-starrt max-h-36 overflow-y-scroll gap-2 p-5 bg-gray-100'>
          <div className='flex'>
            <BotIcon className='w-10 flex-shrink-0'/>
            <p className='font-bold'>GPT {isPending ? 'is thinking...' : 'Says:'}</p>
          </div>
          <p>{isPending ? 'Thinking...' : <Markdown>{summary}</Markdown>}</p>
      </div>
    }

    <form onSubmit={handleAskQuestion} className="flex gap-2">
        <Input type='text' placeholder='i.e. What is this about?' className="w-full" value={input} onChange={(e) => setInput(e.target.value)}/>
        <Button type='submit' disabled={!input || isPending }>{isPending ? 'Asking...' : 'Ask'}</Button>

    </form>
  </DialogContent>
  
</Dialog>
  )
}


export default ChatToDocument;