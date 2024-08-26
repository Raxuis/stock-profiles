import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const userId = searchParams.get('userId');

    if (!symbol || !userId) {
      return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        favoriteStocks: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Checking if the symbol is in the user's favorite stocks
    const isFavorite = user.favoriteStocks.includes(symbol);
    return NextResponse.json({ isFavorite });
  } catch (error) {
    console.error('Error in /api/favorite-status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
