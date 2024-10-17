import { ReactNode } from "react";
import { isTeacher } from "../../../../lib/teacher";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Import cookies utility from Next.js
import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { TextEncoder } from "util"; // Import TextEncoder for encoding the secret

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Your JWT secret
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret for jose

// Helper function to verify the JWT token and extract the userId
async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string; // Return userId
    } catch (error) {
        console.log("Error verifying token:", error);
        return null;
    }
}

const TeacherLayout = async ({ children }: { children: ReactNode }) => {
    // Access cookies from the request using next/headers
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value; // Retrieve the authToken from cookies

    // Verify the token to get userId
    const userId = token ? await verifyToken(token) : null;

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
