import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className='flex space-x-2 items-center animate-pulse'>
        <ArrowLeftCircle className="w-12 h-12" />
        <h1 className="font-bold">Get started by creating a new document</h1>
    </main>
  );
}
