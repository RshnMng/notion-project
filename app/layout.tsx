import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

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

       <ClerkProvider>
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
                          </body>
                     </html>
        </ClerkProvider>
  );
}
