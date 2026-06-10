import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { errorResponse, successResponse } from '@/utils/api-response';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        errorResponse('Missing authorization header'),
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

    return NextResponse.json(successResponse({ valid: true }));
  } catch (error) {
    return NextResponse.json(
      errorResponse('Invalid token'),
      { status: 401 }
    );
  }
}
