import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // Import bcryptjs for hashing passwords
import prismadb from '../../../../lib/db'; // Ensure prisma is properly set up

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Check if user already exists
  const existingUser = await prismadb.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

  // Create the user in the database with the hashed password
  const user = await prismadb.user.create({
    data: {
      email,
      password: hashedPassword, // Store the hashed password
    },
  });

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}

// Restrict GET requests
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
