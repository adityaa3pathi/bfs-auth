import { Category, Course, } from "prisma/prisma-client"
import { CourseCard } from "./course-card-landing";
import { getCourses } from "../../../actions/get-landing-courses";

 
type CourseWIthProgressCategory = Course & {
    category: Category | null;
    chapters: { id: string}[];
    
 }

 

interface CoursesListProps {
    items: CourseWIthProgressCategory[];
 }

 export const  CoursesList = ({
    items
 }: CoursesListProps) => {

    


    return (
       <div>
       <div className="  grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                    {items.map((item) => 
                   <CourseCard
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      imageUrl={item.imageUrl!}
                      chaptersLength={item.chapters.length}
                      price={item.price!}
                      realPrice={item.realPrice!}
                      description={item.description!}
                      category={item?.category?.name!}
                                />
                    )}
        </div>
        {items.length === 0 && (<div className="text-center text-sm mt-10 text-gray-600">No Courses Found</div>)}
        </div>
    )
 }