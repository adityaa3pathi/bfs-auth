"use client"


import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { isTeacher } from "../lib/teacher";
import  Image  from "next/image";







export const NavbarRoutes = () => {



        const pathname = usePathname();
        const router = useRouter();


        const isTeacherPage = pathname?.startsWith("/creator");
        const isCoursePage = pathname?.includes("/courses");
        const isSearchPage = pathname === "/search";


        

            const isVisible =
            pathname?.includes("/creator") ||
            pathname?.includes("/courses") ||
            pathname?.includes("/allcourses") ||
            pathname?.includes("/search");


    return (






<div className="w-full bg-white-a700 px-6 py-2 ">
<div className="flex flex-col items-center gap-[60px] bg-blue_gray-800 py-2 sm:gap-[30px]">
<nav className="bg-gray-100 py-4 w-full fixed top-0 z-50 shadow-md">
      <div className="container flex items-center justify-between mx-auto px-6 md:px-10">
        
        {/* Logo on the left */}
        <div className="flex items-center gap-2">
          <Image
            src="/img_settings.svg" 
            width={30} 
            height={30} 
            alt="HoopsMaster Logo" 
            className="h-[30px] w-[30px]" 
          />
          <span className="text-xl font-bold text-gray-900">BFS</span>
        </div>

        {/* Navigation Links */}
        {/* <div className="flex items-center space-x-8">
          <Link href="/aboutus" passHref>
            <Text size="textlg" as="p" className="text-[12px]  font-normal !text-gray-900  cursor-pointer">
              About Us
            </Text>
          </Link>
          <Link href="/courses" passHref>
          <Text size="textlg" as="p" className="text-[12px]  font-normal !text-gray-900 hover:text-gray-900 cursor-pointer">
              Courses
            </Text>
          </Link>
          <Link href="/contact" passHref>
          <Text size="textlg" as="p" className="text-[12px]  font-normal !text-gray-900 hover:text-gray-900 cursor-pointer">
              Contact
            </Text>
          </Link>
        </div> */}

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/tournaments" passHref>
            <Button size="lg" className="px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium rounded">
              Tournaments
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button size="lg" variant="outline" className="px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
     </nav>
     {/*
*/}
</div>
</div> 













    // <div 
    // className="flex gap-x-2 ml-auto"
    // >

    //     {isTeacherPage || isCoursePage ?(  isTeacher(userId) ?  (
            
    //          <Link href="/">
    //         <Button >
    //             <LogOut  className="h-4 w-4 mr-2"/>
    //             Exit
    //         </Button>
    //         </Link>
    //     ): null)
    //         :
    //             isTeacher(userId) ?
    //      (
    //         <Link href="/creator/courses" >
    //         <Button 
    //         size="sm" variant="ghost"
    //         >
    //             Creator Mode
    //         </Button>
    //         </Link>
    //     ): null}
    //     <UserButton
    //     afterSwitchSessionUrl="/"
    //     />
    // </div>

)
}