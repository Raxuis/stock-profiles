import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export function middleware(req: NextRequest) {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'localhost';
  const rateLimit = rateLimitMap.get(ip) || { count: 0, timestamp: Date.now() };

  // Checking if the user exceeded the request limit
  if (rateLimit.count > 100 && Date.now() - rateLimit.timestamp < 60 * 1000) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Updating the rate limit data
  rateLimit.count++;
  rateLimit.timestamp = Date.now();
  rateLimitMap.set(ip, rateLimit);

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Applying rate limiting to API routes
};
