// CourseSidebarClient.tsx


"use client"


import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps {
  course: any; // Update the type based on your Course type
  progressCount: number;
  purchase: any; // Update based on the purchase type
}

const CourseSidebar = ({ course, progressCount, purchase }: CourseSidebarProps) => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
      <h1 className="font-semibold">{course.title}</h1>
        {/* Add logic to display progressCount */}
     

        {/* Display course progress */}
        
      </div>

      <div className="flex flex-col w-full">
      {course.chapters.length > 0 ? (
          course.chapters.map((chapter: any) => (
            <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={course.id}
              isLocked={!chapter.isFree && !purchase}
          />
        ))
      ) : (
        <p>No chapters available for this course.</p>
      )}
      </div>
    </div>
  );
};
