import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        errorResponse('Invalid credentials'),
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        errorResponse('Invalid password'),
        { status: 401 }
      );
    }

    const token = generateToken({ userId: user.id, role: 'ADMIN' });

    return NextResponse.json(
      successResponse({ user: { id: user.id, email: user.email, role: user.role }, token })
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse('Internal server error'),
      { status: 500 }
    );
  }
}
