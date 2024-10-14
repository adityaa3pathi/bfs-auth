import { Category, Course } from "@/../prisma/prisma-client";
import prismadb from "@/../lib/db";





export const getCourses = async () => {
    try {
        const courses = await prismadb.course.findMany({
            where: {
                isPublished: true,

                
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
               
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Return the courses directly, without progress calculation
        return courses.map(course => ({
            ...course,
            progress: undefined // Remove the progress field or set it as undefined
        }));
    } catch (error) {
        console.log("[GET_COURSES]", error);
        return [];
    }
};
