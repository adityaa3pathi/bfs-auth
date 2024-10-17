"use client";

import { useState } from "react";
import { Section } from "@prisma/client"; // Assuming this type is available
import { Button } from "@/../components/ui/button";

interface SectionsListProps {
  items: Section[];
  onEdit: (id: string) => void;
}

export const SectionsList = ({ items, onEdit }: SectionsListProps) => {
  const [list, setList] = useState(items);

  return (
    <ul className="mt-4 space-y-2">
      {list.map((section) => (
        <li
          key={section.id}
          className="flex items-center justify-between p-2 bg-slate-800 rounded-md"
        >
          <div className="flex items-center gap-x-2 ">
            <span>{section.title}</span>
          </div>
          <Button onClick={() => onEdit(section.id)} variant="ghost"
            className="bg-slate-600">
            Add Chapters
          </Button>
        </li>
      ))}
    </ul>
  );
};
