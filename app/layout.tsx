import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false, // 👈 disables server-side rendering of Providers
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Notion Project",
  description: "Presented by cha' boy",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

                     <html lang="en">
                      
                          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                              >
                              <Providers>
                                <Header />
                                <div className="flex min-h-screen"> 
                                       <Sidebar />

                                        <div className="flex-1 p-4 bg-orange-200 overflow-y-auto scrollbar-hide">
                                              {children}

                                        </div>

                                </div>
                                <Toaster position='top-center'/>
                                </Providers>
                          </body>
                     </html>
  );
}
