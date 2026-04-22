import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - videoplayback etc (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Determine if the request is coming from the specific subdomain
  // This handles both the production domain and local testing (e.g., design.localhost:3000)
  const isMinimalistDomain = 
    hostname === 'design.fahrezi.tech' || 
    hostname.startsWith('design.localhost');

  // If someone accesses the minimalist domain and they are at the root
  if (isMinimalistDomain && url.pathname === '/') {
    // Rewrite the URL to point to the /minimalist directory
    url.pathname = '/minimalist';
    return NextResponse.rewrite(url);
  }

  // Optional: If they access design.fahrezi.tech/about, rewrite to /minimalist/about
  if (isMinimalistDomain && !url.pathname.startsWith('/minimalist')) {
    url.pathname = `/minimalist${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
