import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ToastProvider } from "@/../components/providers/toaster-provider";
import { ConfettiProvider } from "../components/providers/confetti-provider";

const inter = Inter({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en">
        <body>
          
          <main>
            <ConfettiProvider/>
            <ToastProvider/>
            {children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
