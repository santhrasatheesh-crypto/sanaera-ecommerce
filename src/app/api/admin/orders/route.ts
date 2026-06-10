import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(successResponse(orders));
  } catch (error) {
    return NextResponse.json(
      errorResponse('Failed to fetch orders'),
      { status: 500 }
    );
  }
}
