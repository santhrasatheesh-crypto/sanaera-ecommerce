import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const sort = searchParams.get('sort') || 'newest';

    const whereClause: any = {
      status: 'ACTIVE',
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    };

    if (category) {
      whereClause.categoryId = category;
    }

    const orderBy: any = {};
    switch (sort) {
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'price-low':
        orderBy.price = 'asc';
        break;
      case 'price-high':
        orderBy.price = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        images: true,
        reviews: true,
      },
      orderBy,
      take: limit,
    });

    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: parseFloat(p.price.toString()),
      compareAtPrice: p.compareAtPrice ? parseFloat(p.compareAtPrice.toString()) : undefined,
      image: p.images[0]?.url || '/placeholder.jpg',
      images: p.images.map((img) => img.url),
      category: p.categoryId,
      stock: p.stock,
      ratings: p.reviews.length > 0 ? 4.5 : 0,
      reviews: p.reviews.length,
    }));

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Products error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch products'),
      { status: 500 }
    );
  }
}
