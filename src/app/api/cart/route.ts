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

    const cart = await prisma.cartItem.findMany({
      where: { userId: payload.userId },
      include: {
        product: {
          include: {
            images: true,
          },
        },
      },
    });

    const formatted = cart.map((item) => ({
      id: item.id,
      productId: item.productId,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: parseFloat(item.product.price.toString()),
        image: item.product.images[0]?.url || '/placeholder.jpg',
      },
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Cart error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch cart'),
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

    const { productId, quantity, size, color } = await request.json();

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        errorResponse('Product not found'),
        { status: 404 }
      );
    }

    // Add to cart
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: payload.userId,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: payload.userId,
        productId,
        quantity,
        size,
        color,
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
      successResponse(cartItem, 'Added to cart'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      errorResponse('Failed to add to cart'),
      { status: 500 }
    );
  }
}
