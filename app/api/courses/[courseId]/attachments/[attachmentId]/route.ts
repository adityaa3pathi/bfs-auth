export const dynamic = "force-dynamic";

import { getUserId } from "../../../../../../lib/auth-utils";
import { NextResponse } from "next/server";
import prismadb from "../../../../../../lib/db";




export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string, attachmentId: string}}
)  {


    
    try {
        const userId = await getUserId();

        if(!userId) {
            return new NextResponse("UNauthorized", {status: 401 });
        }
   
        const courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if (!courseOwner)  {
            return new NextResponse("Unauthorized", {status: 401 });
        }

        const attachment =  await prismadb.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        })

        return NextResponse.json(attachment);


    }


    catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal Error", {status: 500})
    }



}