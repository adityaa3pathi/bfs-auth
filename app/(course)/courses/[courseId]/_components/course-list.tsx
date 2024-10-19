import { Section, Chapter, Course, UserProgress } from "prisma/prisma-client";
import { CourseListItem } from "./course-list-item";
import { SectionItem } from "./section-item";

interface CourseSidebarProps {
  course: Course & {
    sections: (Section & {
      chapters: (Chapter & {
        userProgress: UserProgress[] | null;
      })[];
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
      {course.sections.map((section) => (
        <SectionItem key={section.id} section={section} courseId={course.id} />
      ))}
    </div>
  );
};
