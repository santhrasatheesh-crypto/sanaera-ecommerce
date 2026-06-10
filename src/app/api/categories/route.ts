import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null,
      },
      include: {
        children: true,
      },
    });

    const formatted = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      children: cat.children.map((child) => ({
        id: child.id,
        name: child.name,
        slug: child.slug,
      })),
    }));

    return NextResponse.json(successResponse(formatted));
  } catch (error) {
    console.error('Categories error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch categories'),
      { status: 500 }
    );
  }
}
