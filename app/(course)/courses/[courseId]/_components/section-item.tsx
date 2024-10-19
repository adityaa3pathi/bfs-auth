import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Chapter, UserProgress } from "prisma/prisma-client";
import { CourseListItem } from "./course-list-item";

interface SectionItemProps {
  section: {
    id: string;
    title: string;
    chapters: (Chapter & {
        userProgress: UserProgress[] | null;
    })[]
  };
  courseId: string;
}

export const SectionItem = ({ section, courseId }: SectionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="border border-slate-500 p-2 rounded-md">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between text-slate-200 text-sm font-semibold l-6 transition-all hover:text-slate-300 hover:bg-slate-300/20"
      >
        <span>{section.title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {section.chapters.map((chapter) => (
            <CourseListItem
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              courseId={courseId}
              isLocked={!chapter.IsFree}
            />
          ))}
        </div>
      )}
    </div>
  );
};
