import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        images: true,
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        errorResponse('Product not found'),
        { status: 404 }
      );
    }

    const formatted = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: parseFloat(product.price.toString()),
      compareAtPrice: product.compareAtPrice ? parseFloat(product.compareAtPrice.toString()) : undefined,
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.altText,
      })),
      variants: product.variants,
      reviews: product.reviews.map((r) => ({
        id: r.id,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        userName: r.user.name,
        createdAt: r.createdAt,
      })),
      stock: product.stock,
      sku: product.sku,
    };

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Product detail error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch product'),
      { status: 500 }
    );
  }
}
