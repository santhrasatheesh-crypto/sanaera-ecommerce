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
    if (!payload) {
      return NextResponse.json(
        errorResponse('Invalid token'),
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: payload.userId },
      include: {
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      total: parseFloat(order.total.toString()),
      items: order.items,
      createdAt: order.createdAt,
    }));

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Orders error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch orders'),
      { status: 500 }
    );
  }
}
