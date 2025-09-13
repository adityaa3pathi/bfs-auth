import { ReactNode } from "react";
import { isTeacher } from "../../../../lib/teacher";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Import cookies utility from Next.js
import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { TextEncoder } from "util"; // Import TextEncoder for encoding the secret
import { getUserId } from "../../../../lib/auth-utils";




const TeacherLayout = async ({ children }: { children: ReactNode }) => {
    // Access cookies from the request using next/headers
   const userId = await getUserId();

    // Redirect if userId is not found
    if (!userId) {
        redirect("/"); // Redirect to home if no userId
        return null;
    }

    // Check if the user is a teacher
    const isUserTeacher = await isTeacher(userId);

    // If the user is not a teacher, redirect to home
    if (!isUserTeacher) {
        redirect("/"); // Redirect to home if the user is not a teacher
        return null;
    }

    // Render the children if the user is a teacher
    return (
        <>
            {children} {/* Correct way to render children */}
        </>
    );
};

export default TeacherLayout;
