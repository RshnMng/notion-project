import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

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

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

console.log("Clerk publishableKey:", publishableKey); 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

       <ClerkProvider publishableKey={publishableKey}>
                     <html lang="en">
                          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                              >
                                <Header />
                                <div className="flex min-h-screen"> 
                                       <Sidebar />

                                        <div className="flex-1 p-4 bg-orange-200 overflow-y-auto scrollbar-hide">
                                              {children}

                                        </div>

                                </div>
                                <Toaster position='top-center'/>
                          </body>
                     </html>
        </ClerkProvider>
  );
}
