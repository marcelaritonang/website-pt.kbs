import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/platform/equipment-booking',
  '/platform/project-tracking',
  '/platform/material-store',
  '/platform/orders',
  '/platform/invoice',
  '/platform/admin',
];

// Routes that should redirect to platform if already logged in
const authRoutes = ['/platform/login'];

// Decode JWT payload and check expiry (Edge-compatible, no crypto deps)
function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(atob(parts[1]));

    // Check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('kbs_token')?.value;

  // Check if accessing protected route without valid token
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && (!token || !isTokenValid(token))) {
    const loginUrl = new URL('/platform/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(loginUrl);
    // Clear invalid cookies so user isn't stuck in a loop
    if (token) {
      response.cookies.delete('kbs_token');
      response.cookies.delete('kbs_user');
    }
    return response;
  }

  // If logged in and trying to access login page, redirect to platform or redirect param
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  if (isAuthRoute && token && isTokenValid(token)) {
    const redirectTo = request.nextUrl.searchParams.get('redirect') || '/platform';
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/platform/:path*'],
};
