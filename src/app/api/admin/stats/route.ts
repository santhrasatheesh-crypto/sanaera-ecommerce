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

    const stats = {
      totalOrders: await prisma.order.count(),
      totalRevenue: await prisma.order.aggregate({
        _sum: { total: true },
      }),
      totalCustomers: await prisma.user.count({
        where: { role: 'CUSTOMER' },
      }),
      totalProducts: await prisma.product.count(),
      recentOrders: await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true },
      }),
    };

    return NextResponse.json(successResponse(stats));
  } catch (error) {
    return NextResponse.json(
      errorResponse('Failed to fetch stats'),
      { status: 500 }
    );
  }
}
