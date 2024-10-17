import { getUserId } from "../../../../../../../lib/auth-utils";
import { NextResponse } from  "next/server";
import prismadb from "../../../../../../../lib/db";
import { json } from "stream/consumers";
import { isTeacher } from "../../../../../../../lib/teacher";


export async function POST(
    req: Request,
    {params}: {params: {courseId: string, sectionId: string},
}
)

{
    try {
        const userId = await getUserId();
        const  {title} = await req.json();

        if (!userId || !isTeacher(userId)) {

            return new NextResponse("Unauthorized", {status: 401});
        }

        const  courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!courseOwner) {

            return new NextResponse("Unauthorized", {status: 401});
        }

            const lastChapter = await prismadb.chapter.findFirst({
                where: {
                    courseId: params.courseId,
                    sectionId: params.sectionId
                },

                orderBy: {
                    position: "desc", 
                }
            });

            const  newPosition = lastChapter ? lastChapter.position + 1 : 1;


            const chapter = await prismadb.chapter.create({
                data: {
                    title,
                    courseId: params.courseId,
                    sectionId: params.sectionId,
                    position: newPosition,
                }
            });

            return  NextResponse.json(chapter)

     }

     catch (error) {
        console.log("[chapters]", error);
        return new NextResponse("Internal Server error", {status: 500});
     }


}

