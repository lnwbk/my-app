import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Footer from "@/app/components/footer";
import Header from "@/app/components/header";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <div className="bg-gray-200 min-h-screen grid grid-rows-[auto_1fr_auto] text-black">
          <Header />
          <main className="container mx-auto bg-white/50 rounded-xl py-7 px-8 m-6 overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}