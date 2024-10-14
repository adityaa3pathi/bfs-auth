import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Chapter, Course, UserProgress } from "prisma/prisma-client"
import prismadb from "@/../lib/db";
import { CourseListItem } from "./course-list-item";



interface CourseSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

export const   CourseContainer = async({
    course,
    progressCount,
}: CourseSidebarProps ) => {
  
    return (
        <div className=" m-4 space-y-2  rounded-xl">
          {course.chapters.map((chapter) => (
            <CourseListItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.IsFree }
  
            />
          ))}
        </div>
      );


}

