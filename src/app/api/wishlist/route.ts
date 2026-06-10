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

    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: payload.userId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    const formatted = wishlist.map((item) => ({
      id: item.id,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: parseFloat(item.product.price.toString()),
        image: item.product.images[0]?.url || '/placeholder.jpg',
      },
    }));

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Wishlist error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch wishlist'),
      { status: 500 }
    );
  }
}

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

    const { productId } = await request.json();

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: payload.userId,
        productId,
      },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    return NextResponse.json(
      successResponse(wishlistItem, 'Added to wishlist'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json(
      errorResponse('Failed to add to wishlist'),
      { status: 500 }
    );
  }
}
