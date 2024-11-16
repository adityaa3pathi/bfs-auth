
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prismadb from "../../../../../../lib/db";
import { getUserId } from "../../../../../../lib/auth-utils";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; sectionId: string } }
) {
    try {
        const userId = getUserId();

        if (userId != null) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Verify ownership of the course
        const ownCourse = await prismadb.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            },
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the chapter exists
        const section = await prismadb.section.findUnique({
            where: {
                id: params.sectionId,
                courseId: params.courseId,
            },
        });

        if (!section) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Delete the chapter
        const deletedSection = await prismadb.section.delete({
            where: { id: params.sectionId },
        });

        // If no other chapters are published, unpublish the course
        

        return NextResponse.json(deletedSection);
    } catch (error) {
        console.log("[CHAPTER_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

