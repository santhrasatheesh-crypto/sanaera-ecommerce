import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse } from '@/utils/api-response';
import { validateAddress } from '@/utils/validation';

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

    const addresses = await prisma.address.findMany({
      where: { userId: payload.userId },
    });

    return NextResponse.json(successResponse(addresses));
  } catch (error) {
    console.error('Addresses error:', error);
    return NextResponse.json(
      errorResponse('Failed to fetch addresses'),
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

    const addressData = await request.json();
    const errors = validateAddress(addressData);

    if (errors.length > 0) {
      return NextResponse.json(
        errorResponse('Validation failed', { address: errors }),
        { status: 400 }
      );
    }

    const address = await prisma.address.create({
      data: {
        userId: payload.userId,
        ...addressData,
      },
    });

    return NextResponse.json(
      successResponse(address, 'Address added'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Add address error:', error);
    return NextResponse.json(
      errorResponse('Failed to add address'),
      { status: 500 }
    );
  }
}
