import { cookies } from "next/headers"; // Import cookies utility from Next.js
import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { TextEncoder } from "util"; // Import TextEncoder for encoding the secret

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use the same JWT secret
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret for jose

// Helper function to verify JWT token and extract the userId
export async function getUserId(): Promise<string | null> {
    try {
        // Access cookies using next/headers
        const cookieStore = cookies();
        const token = cookieStore.get("authToken")?.value; // Retrieve the authToken from cookies

        if (!token) {
            return null; // No token found, return null
        }

        // Verify the JWT token to extract the userId
        const { payload } = await jwtVerify(token, secret);
        return payload.userId as string; // Return userId as string
    } catch (error) {
        console.log("Error verifying token:", error);
        return null; // If verification fails, return null
    }
}
