import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function POST(request: NextRequest) {
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

    const { productId, rating, title, comment } = await request.json();

    if (!productId || !rating || !title) {
      return NextResponse.json(
        errorResponse('Missing required fields'),
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        errorResponse('Rating must be between 1 and 5'),
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: payload.userId,
        productId,
        rating,
        title,
        comment,
      },
    });

    return NextResponse.json(
      successResponse(review, 'Review created'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Review creation error:', error);
    return NextResponse.json(
      errorResponse('Failed to create review'),
      { status: 500 }
    );
  }
}
