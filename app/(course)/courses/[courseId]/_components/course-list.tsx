import { Section, Chapter, Course, UserProgress } from "prisma/prisma-client";
import { CourseListItem } from "./course-list-item";
import { SectionItem } from "./section-item";

interface CourseSidebarProps {
  course: Course & {
    sections: (Section & {
      chapters: (Chapter & {
        userProgress: UserProgress[] | null;
        createdAt: Date; // Ensure createdAt is defined in Section model
      })[];
      createdAt: Date; // Ensure createdAt is defined in Section model
    })[];
  };
  progressCount: number;
}

export const CourseContainer = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  return (
    <div className="m-4 space-y-2 rounded-xl">
      {course.sections
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) // Sort sections by createdAt
        .map((section) => (
          <SectionItem key={section.id} section={section} courseId={course.id} />
        ))}
    </div>
  );
};
