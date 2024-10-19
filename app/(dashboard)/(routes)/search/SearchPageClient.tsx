"use client";

import { usePathname, useRouter } from "next/navigation";
import { CoursesList } from "../../../../components/courses-List";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { LogOut } from "lucide-react";
import { isTeacher } from "../../../../lib/teacher";

interface SearchPageClientProps {
  courses: any[];  // Replace with your actual course type
  userId: string;
}

export const SearchPageClient = ({ courses, userId }: SearchPageClientProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isTeacherPage = pathname?.startsWith("/creator");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <div>
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/search">
            <Button>
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/creator/courses">
            <Button size="sm" className="bg-slate-600 text-gray-200 hover:bg-slate-900" variant="default">
              Creator Mode
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="p-6 space-y-4">
        <CoursesList items={courses} />
      </div>
    </div>
  );
};
