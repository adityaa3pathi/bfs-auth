import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { TextEncoder } from 'util';
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import prismadb from '../../../../lib/db';

const MAX_SESSIONS = 1;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Store this secret in your .env file
const secret = new TextEncoder().encode(JWT_SECRET); // Encode the secret for jose

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Find user by email
  const user = await prismadb.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log('User not found');
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Verify the password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    console.log('Incorrect password');
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Fetch user sessions
  const sessions = await prismadb.session.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' }, // Order by oldest first
  });

  // If the user already has 2 sessions, delete the oldest one
  if (sessions.length >= MAX_SESSIONS) {
    const oldestSession = sessions[0];
    await prismadb.session.delete({ where: { id: oldestSession.id } });
  }

  // Create a new session
  const newSession = await prismadb.session.create({
    data: { userId: user.id },
  });

  // Generate JWT token using jose
  const token = await new SignJWT({ userId: user.id, sessionId: newSession.id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d') // Token expires in 7 days
    .sign(secret);

  // Set JWT in an HTTP-only cookie
  const response = NextResponse.json({
    message: 'Login successful',
    sessionId: newSession.id,
    user: { email: user.email, id: user.id },
  });

  // Set the cookie
  response.cookies.set('authToken', token, {
    httpOnly: true, // Cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // Send only over HTTPS
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/', // Cookie available throughout the site
  });

  console.log('At the last');
  return response;
}
