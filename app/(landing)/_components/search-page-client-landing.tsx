"use client";

import { usePathname, useRouter } from "next/navigation";

import Link from "next/link";
import { CoursesList } from "./courses-list-landing";

interface SearchPageClientProps {
  courses: any[];  // Replace with your actual course type
  
}

export const SearchPageClient = ({ courses }: SearchPageClientProps) => {
  const pathname = usePathname();


  return (
    <div>
    
      <div className="p-6 space-y-4 bg-gray-900">
        <CoursesList items={courses} />
      </div>
    </div>
  );
};
