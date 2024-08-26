import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, userId } = body;

    if (typeof symbol !== 'string' || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { favoriteStocks: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const favoriteStocks = user.favoriteStocks as string[] || [];
    const isFavorite = favoriteStocks.includes(symbol);

    // 👇 Updating favorite stocks: adding if not present, remove if present
    const updatedFavorites = isFavorite
      ? favoriteStocks.filter((stock: string) => stock !== symbol)
      : [...favoriteStocks, symbol];

    await prisma.user.update({
      where: { id: userId },
      data: { favoriteStocks: updatedFavorites },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/toggle-favorite:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
