import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request) {
  
  const cookieStore =  await cookies();
  const token = cookieStore.get('token');

  if (request.nextUrl.pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));  
  }

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));  
  }

  return NextResponse.next();  
}