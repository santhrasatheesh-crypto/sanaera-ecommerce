import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { successResponse, errorResponse } from '@/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        errorResponse('Invalid email'),
        { status: 400 }
      );
    }

    const subscription = await prisma.newsletter.upsert({
      where: { email },
      update: { isSubscribed: true },
      create: { email },
    });

    return NextResponse.json(
      successResponse(subscription, 'Subscribed to newsletter'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      errorResponse('Failed to subscribe'),
      { status: 500 }
    );
  }
}
