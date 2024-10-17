import { getUserId } from "../../../../../lib/auth-utils";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/db";





export async function PATCH (
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
            userId: userId
        },
        include: {
            chapters: true,
        }
       });

       if(!course) {

        console.log(userId)
        console.log(course)
        return new NextResponse("Not Foundddddd", {status: 404 });
       }

       const hasPublushedChapter = course.chapters.some((chapter) => chapter.isPublished)

       if(!course.title || !course.categoryId || !course.imageUrl || !course.description || !hasPublushedChapter) {
        return new NextResponse("Missing required fields ", {status: 401});
       }


       const publishedCourse = await prismadb.course.update({
        where: {
            id: params.courseId,
            userId,
        },
        data: {
            isPublished: true
        }
       })

         return NextResponse.json(publishedCourse);
    } catch (error) {
        console.log("COURSE_ID_PUBLISH", error);
        return new NextResponse("Internal Errorrrr", {status: 500})
    }
}