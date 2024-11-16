export const dynamic = "force-dynamic";

import { getUserId } from "../../../../../lib/auth-utils";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/db";





export async function PATCH(
    req: Request,
{params}: { params: {courseId: string}}
) {
    try {
        const userId = await getUserId();

        if(!userId) {
            return new NextResponse("Unauthorizerd", {status: 401});
        }
       const course = await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        }
       });

       if(!course) {
        return new NextResponse("Not Found", {status: 404 });
       }

      

      


       const unpublishedCourse = await prismadb.course.update({
        where: {
            id: params.courseId,
            userId,
        },
        data: {
            isPublished: false
        }
       })


       return NextResponse.json(unpublishedCourse);

    } catch (error) {
        console.log("COURSE_ID_UNPUBLISH", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}