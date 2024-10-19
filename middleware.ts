import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose
import { cookies } from 'next/headers'; // Use cookies utility to access cookies

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Convert your secret to Uint8Array for jose
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: Request) {
  console.log("inside the middleware 1");

  // Access cookies using the cookies utility
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirect to login page if no token
  }

  try {
    // Verify JWT token using jose
    await jwtVerify(token, secret);

    console.log("inside the middleware 2");
    return NextResponse.next(); // Continue if token is valid
  } catch (error) {
    console.log(error);
    console.log("inside the middleware 3");
    const signInUrl = new URL('/sign-in', request.url); // Create an absolute URL
    return NextResponse.redirect(signInUrl);
  }
}

// Apply middleware to protect routes under '/search'
export const config = {
  matcher: ['/creator'], // Protect '/search' routes
};
