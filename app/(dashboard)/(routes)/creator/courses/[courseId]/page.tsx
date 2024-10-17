import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { CategoryForm } from "./_components/categories-form";
 import { ImageForm } from "./_components/image-form";
import { IconBadge } from "@/../components/icon-badge";
import prismadb from "@/../lib/db";
import { getUserId } from "../../../../../../lib/auth-utils";
import { CircleDollarSign, LayoutDashboard, ListChecks } from "lucide-react";
import {redirect} from "next/navigation" 
import { PriceForm } from "./_components/price-form";
import { File } from "lucide-react";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "../../../../../../components/banner";
import { Actions } from "./_components/actions";
import { SectionsForm } from "./_components/section-form";
import { RealPriceForm } from "./_components/fake-price";



const CourseIdPage =  async (

    {params}:
   { params: {courseId: string}}
) => {



    const userId = await getUserId();

    if(!userId) {
        return redirect("/");
    }


    const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            },
            sections: {
                orderBy: {
                    position: "asc",
                }
            },
            attachments:  {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

      const categories = await prismadb.category.findMany({
        orderBy: {
            name: "asc",
        }
      })

      console.log(categories);


    if(!course) {
        return redirect("/");
    }

        const requiredFields = [
            course.title,
            course.description,
            course.imageUrl,
            course.price,
            course.realPrice,
            course.categoryId,
            course.chapters.some(chapter => chapter.isPublished)
        ]

        const totalFields = requiredFields.length;

        const completedFields = requiredFields.filter(Boolean).length;

        const completionText = `(${completedFields}/${totalFields})`

        const isComplete =  requiredFields.every(Boolean); 


    return ( 
   <>

   {!course.isPublished && (
    <Banner
    label="This course is not published it will not be visible to the students."/>
   )}
        <div className="p-6">

            <div className="flex item-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className= "text-gray-800 text-2xl font-medium">
                        Course Setup

                    </h1>
                       <span className="text-sm text-slate-700">
                        Complete all fields {completionText}


                       </span>
                </div>

              <Actions
              disabled= {!isComplete}
              courseId={params.courseId}
              isPublished={course.isPublished}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">

                <div>

                    <div className="flex items-center gap-x-2">

                    <IconBadge icon={LayoutDashboard} />
                        <h2 className=" text-gray-700 text-xl">   
                            Customize your course
                        </h2>
                    </div>
                    <TitleForm
                    initialData={course}
                    courseId={course.id}
                    />

                    <DescriptionForm
                    initialData={course}
                    courseId={course.id}
                    />
                    <ImageForm
                    initialData={course}
                    courseId={course.id}
                    />
                    <CategoryForm
                    initialData={course}
                    courseId={course.id}
                    options={categories.map((category) => ({
                        label: category.name,
                        value: category.id,
                    }))}
                    />
                </div>

                <div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-gray-700">
                                Course sections
                            </h2>
                        </div>
                        <SectionsForm
                    initialData={course}
                    courseId={course.id}
                    />
                    </div>
                    <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge icon={CircleDollarSign} />
                        <h2 className="text-gray-700">
                            Sell your course
                        </h2>
                    </div>
                    <RealPriceForm
                    initialData={course}
                    courseId={course.id}
                    />
                    <PriceForm
                    initialData={course}
                    courseId={course.id}
                    />
                    
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                            <IconBadge icon={File} />
                            <h2 className="text-gray-700  text-xl">
                                Resourses and Attachments
                            </h2>
                     </div>
                     <AttachmentForm
                    initialData={course}
                    courseId={course.id}
                    />
                    </div>
                    </div>
            </div>
        </div>
        </>
     );
}
 
export default CourseIdPage;