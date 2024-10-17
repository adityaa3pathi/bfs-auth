// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prismadb from '../../../../lib/db'; // Ensure prisma is properly set up


export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const existingUser = await prismadb.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = password

  const user = await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User created' }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
