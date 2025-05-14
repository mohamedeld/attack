import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  const isLoggedIn = !!token;

  const { pathname } = req.nextUrl;

  const authPages = ['/login', '/register'];

  // 🔒 Prevent logged-in users from accessing auth pages
  if (isLoggedIn && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 🧑‍🚀 Allow logged-in users access to any matched page
  if (isLoggedIn) {
    return NextResponse.next();
  }

  if (!isLoggedIn && (authPages.includes(pathname))) {
    return NextResponse.next();
  }

  // 🔐 Redirect non-authenticated users from protected pages
  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
      '/',
    '/attacks',
    '/questions',
    '/feedback',
    '/dashboard',
    '/feeddash',
    '/profile',
    '/quizes'
  ],
};