import { cookies } from 'next/headers'; // Import cookies to access authToken
import { jwtVerify } from 'jose'; // Use jose to verify JWT
import prismadb from "../../../../lib/db";
import { getCourses } from "../../../../actions/get-courses";
import { SearchPageClient } from "./SearchPageClient";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

// JWT secret for verifying the token
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

// Helper function to verify JWT token and extract userId
async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload.userId as string; // Extract userId from the token payload
  } catch (error) {
    console.log('Error verifying token:', error);
    return null;
  }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  // Get the cookies from the request
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value; // Get the authToken from cookies

  if (!token) {
    console.log('No token found, redirecting to login');
    return null; // Redirect or handle the missing token scenario
  }

  // Verify the token and extract the userId
  const userId = await verifyToken(token);
  if (!userId) {
    console.log('Invalid token, redirecting to login');
    return null; // Redirect or handle the invalid token scenario
  }

  // Fetch categories (if needed)
  const categories = await prismadb.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  // Fetch courses based on userId and search params
  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return <SearchPageClient courses={courses} userId={userId} />;
};

export default SearchPage;
