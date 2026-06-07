import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
  '/platform/equipment-booking',
  '/platform/project-tracking',
  '/platform/material-store',
  '/platform/orders',
  '/platform/invoice',
];

// Routes that should redirect to platform if already logged in
const authRoutes = ['/platform/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('kbs_token')?.value;

  // Check if accessing protected route without token
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/platform/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access login page, redirect to platform
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/platform', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/platform/:path*'],
};
