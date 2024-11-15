"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { useRouter } from "next/navigation";

interface CourseNavbarProps {
  userId?: string | null; // userId is passed as a prop from the server-side component
}

export default function NavBarContainer({
  userId,
}: CourseNavbarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const [navBackground, setNavBackground] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Handle scroll to add background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        // Redirect or refresh after successful logout
       router.refresh();// Redirect to home after logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Define the routes where the MobileSidebar should be visible
  const shouldShowMobileSidebar =
    pathname?.includes("/creator") ||
    pathname?.includes("/courses") ||
    pathname?.includes("/all-courses") ||
    pathname?.includes("/search");

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50  pb-2  ${
        navBackground || isOpen ? "bg-gray-800 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {shouldShowMobileSidebar && (
            <div className="md:hidden  bg-slate-600 flex items-center p-2 rounded">
              <MobileSidebar />
            </div>
          )}

          {/* Logo */}
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/djrrvcvyl/image/upload/v1727725223/Screenshot_from_2024-10-01_01-08-53-removebg-preview_g3hixa.png"
              alt="Badaya Fitness Logo"
              width={100}
              height={1}
              className="h-[50px] w-[100px]"
            />
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <div className="flex items-center sm:hidden justify-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a35076] justify-between"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <svg
                className="h-6 w-6 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden   items-center justify-between sm:flex sm:space-x-8 ">
            <a
              href="/search"
              className="text-gray-200 hover:text-[#a35076] transition-colors"
            >
              Courses
            </a>
            <a
              href="#about"
              className="text-gray-200 hover:text-[#a35076] transition-colors "
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-gray-200 hover:text-[#a35076] transition-colors"
            >
              Contact Us
            </a>
            <div className="flex items-center justify-between ">
            <a
  href="#slam-jam"
  className="bg-[#a35076] text-white px-4 py-2 rounded-lg hover:bg-[#832b55] transition-all flex items-center justify-center whitespace-nowrap"
>
  Slam Jam
</a>

            </div>
            {/* Conditionally render Login or Logout button */}
            {userId ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link href="/auth/login">
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden " id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 ">
            <a
              href="#courses"
              className="block text-gray-200 hover:text-[#a35076] transition-colors"
            >
              Courses
            </a>
            <a
              href="#about"
              className="block text-gray-200 hover:text-[#a35076] transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="block text-gray-200 hover:text-[#a35076] transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#slam-jam"
              className="block bg-[#a35076] text-white px-4 py-2 rounded-lg hover:bg-[#832b55] transition-all "
            >
              Slam Jam 
            </a>
            {/* Conditionally render Login or Logout button for mobile */}
            {userId ? (
              <button
                onClick={handleLogout}
                className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all "
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <div className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
