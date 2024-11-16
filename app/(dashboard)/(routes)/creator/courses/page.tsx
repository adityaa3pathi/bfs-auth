

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import prismadb from "../../../../../lib/db";
import { cookies } from 'next/headers'; // Use cookies utility to access cookies
import { jwtVerify } from 'jose'; // Import the jwtVerify function
import { TextEncoder } from 'util'; // Import TextEncoder for encoding the secret

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Your JWT secret
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret for jose

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string; // Cast to string
    } catch (error) {
        console.log('Error verifying token:', error);
        return null;
    }
}

const CoursesPage = async () => {
    // Access cookies from the request using next/headers
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value; // Retrieve the authToken from cookies

    // Verify the token to get userId
    const userId = token ? await verifyToken(token) : null;

    // Redirect if userId is not found
    if (!userId) {
        console.log('No userId found');
        redirect("/"); // Redirect to home if no userId
        return null;
    }

    // Fetch courses related to the userId
    const courses = await prismadb.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    return (
        <div>
            <DataTable columns={columns} data={courses} />
        </div>
    );
}

export default CoursesPage;
