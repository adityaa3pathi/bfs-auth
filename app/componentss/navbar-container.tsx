"use client"; // This makes this file a client-side component

import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { MobileSidebar } from "../(dashboard)/_components/mobile-sidebar";
import { usePathname } from "next/navigation";

interface CourseNavbarProps {
  userId?: string | null; // userId is passed as a prop from the server-side component
}

export default function NavBarContainer({
  userId,
}: CourseNavbarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  // Define the routes where the MobileSidebar should be visible
  const shouldShowMobileSidebar =
    pathname?.includes("/creator") ||
    pathname?.includes("/courses") ||
    pathname?.includes("/all-courses") ||
    pathname?.includes("/search");

  // Update loading state when userId is resolved (whether authenticated or not)
  useEffect(() => {
    if (userId !== undefined) {
      setIsLoading(false);
    }
  }, [userId]);

  return (
    <>
      <div className="bg-gray-200">
        <div className="flex flex-col items-center gap-[60px] py-2 sm:gap-[30px]">
          <nav className="bg-gray-200 py-4 fixed top-0 z-50 shadow-custom-lg w-full">
            <div className="container flex items-center justify-between mx-auto px-6 md:px-10">
              {/* Logo is always rendered */}
              {/* Conditionally render MobileSidebar only on small screens and specific routes */}
              {shouldShowMobileSidebar && (
                <div className="md:hidden  bg-slate-600 flex items-center p-2 rounded">
                  <MobileSidebar />
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Link href="/">
                  <Image
                    src="https://res.cloudinary.com/djrrvcvyl/image/upload/v1727725223/Screenshot_from_2024-10-01_01-08-53-removebg-preview_g3hixa.png"
                    alt="Badaya Fitness Logo"
                    width={100}
                    height={1}
                    className="h-[50px] w-[100px]"
                  />
                </Link>
                <span className="text-2xl font-extrabold text-pink-100">
                  {/* Logo Text or Other Content */}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <Link href="/search" passHref>
                  <Button
                    size="sm"
                    className="px-2 py-2 bg-pink-100 hover:bg-gray-400 text-gray-900 font-medium rounded"
                  >
                    Courses
                  </Button>
                </Link>

                {/* Conditionally render UserButton or Sign Up */}
                {/* {userId ? ( // Check if userId exists */}
                  {/* } UserButton displayed if user is authenticated
                ) : (
                  null  Render nothing if user is not authenticated
                )} */}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}