


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";




import { ToastProvider } from "@/../components/providers/toaster-provider";
import { ConfettiProvider } from "../components/providers/confetti-provider";






const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bfs zone",
  description: "Baksetball Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body >
          
          <main >
            <ConfettiProvider/>
            <ToastProvider/>
            {children}</main>
        </body>
      </html>
   
  );
}
