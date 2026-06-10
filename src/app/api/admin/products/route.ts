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

    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(successResponse(products));
  } catch (error) {
    return NextResponse.json(
      errorResponse('Failed to fetch products'),
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

    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json(
        errorResponse('Unauthorized'),
        { status: 401 }
      );
    }

    const productData = await request.json();

    const product = await prisma.product.create({
      data: {
        name: productData.name,
        slug: productData.slug,
        description: productData.description,
        price: parseFloat(productData.price),
        compareAtPrice: productData.compareAtPrice ? parseFloat(productData.compareAtPrice) : undefined,
        categoryId: productData.categoryId,
        sku: productData.sku,
        stock: productData.stock,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json(
      successResponse(product, 'Product created'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      errorResponse('Failed to create product'),
      { status: 500 }
    );
  }
}
