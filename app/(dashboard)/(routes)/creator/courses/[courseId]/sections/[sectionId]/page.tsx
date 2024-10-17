import { IconBadge } from "../../../../../../../../components/icon-badge";
import prismadb from "../../../../../../../../lib/db";
import { ChaptersForm } from "../../_components/chapters-form";
import { ListChecks } from "lucide-react";
import { getUserId } from "../../../../../../../../lib/auth-utils";
import { redirect } from "next/navigation";

export default async function SessionIdPageasync({
    params
}: {
    params: {
        courseId: string; chapterId: string; sectionId: string
    }
}) {

    const userId = await getUserId();


    if(!userId)  {
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

    if(!course) {
        return redirect("/");
    }


    const section = await prismadb.section.findUnique({
        where: {
            id: params.sectionId,
            courseId: params.courseId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            }

        }
       
    });

    if(!section) {
        return redirect("/");
    }


    return (
<div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={ListChecks} />
                            <h2 className="text-gray-700">
                                Course sections
                            </h2>
                        </div>
                        <ChaptersForm
                    initialData={section}
                    courseId={course.id}
                    sectionId={section.id}
                    />
                    </div>

        
    )
}