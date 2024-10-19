import { Category, Course } from "@/../prisma/prisma-client";
import prismadb from "../lib/db"

type CourseWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
};

type GetPublishedCoursesParams = {
    title?: string;
    categoryId?: string;
};

export const getPublicCourses = async ({
    title,
    categoryId,
}: GetPublishedCoursesParams): Promise<CourseWithCategory[]> => {
    try {
        const courses = await prismadb.course.findMany({
            where: {
                isPublished: true,
                title: {
                    contains: title,
                },
                categoryId,
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

        return courses;
    } catch (error) {
        console.log("[GET_PUBLISHED_COURSES]", error);
        return [];
    }
};
