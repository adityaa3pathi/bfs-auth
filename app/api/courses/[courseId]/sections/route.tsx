import { getUserId } from "../../../../../lib/auth-utils";
import { NextResponse } from  "next/server";
import prismadb from "../../../../../lib/db";
import { json } from "stream/consumers";
import { isTeacher } from "../../../../../lib/teacher";


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

            const lastSection = await prismadb.section.findFirst({
                where: {
                    courseId: params.courseId,
                },
                orderBy: {
                    position: "desc", 
                }
            });

            const  newPosition = lastSection ? lastSection.position + 1 : 1;


            const section = await prismadb.section.create({
                data: {
                    title,
                    courseId: params.courseId,
                    
                    position: newPosition,
                }
            });

            return  NextResponse.json(section)

     }

     catch (error) {
        console.log("[sections]", error);
        return new NextResponse("Internal Server error", {status: 500});
     }


}

