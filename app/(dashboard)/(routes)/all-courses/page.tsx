export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getDashboardCourses } from "../../../../actions/get-dashboard-courses";
import { CoursesList } from "../../../../components/courses-List";
import { CheckCircle, Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import { jwtVerify } from 'jose'; // Import the jwtVerify function
import { TextEncoder } from 'util'; // Import TextEncoder for encoding the secret
import { cookies } from 'next/headers'; // Import cookies utility

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Your JWT secret
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret

async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string; // Cast to string
    } catch (error) {
        console.log('Error verifying token:', error);
        return null;
    }
}

export default async function Home() {
    // Access cookies from the request using next/headers
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value; // Retrieve the authToken from cookies

    // Verify the token to get userId
    const userId = token ? await verifyToken(token) : null;

    // Redirect if userId is not found
    if (!userId) {
        redirect("/"); // Redirect to home if no userId
        return null;
    }

    // Fetch the dashboard courses using the userId
    const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

    return (
        <div className="p-6 space-y-4">
            {/* Set grid to 2 columns by default */}
            <div className="grid grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    numberOfItems={coursesInProgress.length}
                    label="In Progress"
                />
                <InfoCard
                    icon={CheckCircle}
                    variant="success"
                    numberOfItems={completedCourses.length}
                    label="Completed"
                />
            </div>
            <CoursesList items={[...coursesInProgress, ...completedCourses]} />
        </div>
    );
}
