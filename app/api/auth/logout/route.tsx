import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Import jwtVerify from jose
import prismadb from '../../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use the same JWT secret
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret for jose

export async function POST(request: Request) {
  const cookies = request.headers.get('cookie') || '';
  const token = cookies.split('; ').find((cookie) => cookie.startsWith('authToken='))?.split('=')[1];

  if (!token) {
    return NextResponse.json({ error: 'No auth token found' }, { status: 400 });
  }

  try {
    // Verify the JWT token using jose to extract the session ID
    const { payload } = await jwtVerify(token, secret);

    // Type cast to get the sessionId from the payload
    const sessionId = (payload as { sessionId: string }).sessionId;

    if (!sessionId) {
      throw new Error('Invalid token payload');
    }

    // Delete the session from the database using the sessionId
    await prismadb.session.delete({
      where: { id: sessionId },
    });

    // Clear the authToken cookie
    const response = NextResponse.json({ message: 'Logged out successfully' });
    response.cookies.set('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // Expire the cookie immediately
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Invalid token or session' }, { status: 401 });
  }
}
