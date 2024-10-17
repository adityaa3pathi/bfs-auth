import { getUserId } from "../../../../../../lib/auth-utils";
import { NextResponse } from "next/server";
import prismadb from "../../../../../../lib/db";

export async function PUT(
    req: Request,
    {params} : {params: {courseId: string; }}
)

{
    try {

        const userId = await getUserId();
    if(!userId) {
        return new NextResponse("Unauthorized", {status: 401});
    }

    const {list} =  await req.json();

    const ownCourse =  await prismadb.course.findUnique({
        where: {
            id: params.courseId,
            userId: userId
        }
    })

    if(!ownCourse){
        return new NextResponse("UNauthorized", { status: 401});
    }

    for (let item of list ) {
        await prismadb.chapter.update({
            where: {id: item.id},
            data: {position: item.position }
        });
    }

    return new NextResponse("Succees", {status: 200});

    } catch (error) {
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}
