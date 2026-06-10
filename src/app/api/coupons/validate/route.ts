import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        errorResponse('Coupon code required'),
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive || new Date() > coupon.validUntil) {
      return NextResponse.json(
        errorResponse('Invalid or expired coupon'),
        { status: 404 }
      );
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        errorResponse('Coupon usage limit exceeded'),
        { status: 400 }
      );
    }

    return NextResponse.json(
      successResponse({
        id: coupon.id,
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: parseFloat(coupon.discountValue.toString()),
        maxDiscount: coupon.maxDiscount ? parseFloat(coupon.maxDiscount.toString()) : undefined,
        minOrderValue: coupon.minOrderValue ? parseFloat(coupon.minOrderValue.toString()) : undefined,
      })
    );
  } catch (error) {
    console.error('Coupon error:', error);
    return NextResponse.json(
      errorResponse('Failed to validate coupon'),
      { status: 500 }
    );
  }
}
