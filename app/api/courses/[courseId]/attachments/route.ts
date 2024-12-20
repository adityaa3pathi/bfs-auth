export const dynamic = "force-dynamic"; // Ensure the route is dynamic

import { getUserId } from "../../../../../lib/auth-utils";
import { NextResponse } from "next/server";
import prismadb from "../../../../../lib/db";
import { isTeacher } from "../../../../../lib/teacher";



export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        const userId = await getUserId();
        const { url } = await req.json();

        if (!userId || !isTeacher(userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const attachment = await prismadb.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId
            }
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
