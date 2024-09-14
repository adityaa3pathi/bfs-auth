import { Category, Course } from "prisma/prisma-client"
import { CourseCard } from "./course-card";

 


 type CourseWIthProgressCategory = Course & {
    category: Category | null;
    chapters: { id: string}[];
    progress: number | null;
 }


 interface CoursesListProps {
    items: CourseWIthProgressCategory[];
 }

 export const CoursesList = ({
    items
 }: CoursesListProps) => {
    return (
       <div>
       <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap">
                    {items.map((item) => 
                   <CourseCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl!}
                      chaptersLength={item.chapters.length}
                      price={item.price!}
                      progress={item.progress}
                      category={item?.category?.name!}
                                />
                    )}
        </div>
        {items.length === 0 && (<div className="text-center text-sm text-muted-foreground mt-10">No Courses Found</div>)}
        </div>
    )
 }