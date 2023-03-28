import { NextResponse } from 'next/server'
import { getTokenPayload } from '@/utils'
import { AUTH_TOKEN } from '@/constants'

export async function middleware (req) {
 const token = req.cookies && req.cookies.get(AUTH_TOKEN) ? req.cookies.get(AUTH_TOKEN)?.value : null
 if (!token) {
  return NextResponse.redirect(new URL('/auth/login', req.url))
 }

// Check if token is valid
 try {
  const {payload} = await getTokenPayload(token)
  req.user = payload
  const response = NextResponse.next()
  return response
 } catch (error) {
  return NextResponse.redirect(new URL('/auth/login', req.url))
 }
}

export const config = {
 matcher: [
  // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  '/want-to-read',
  '/read',
  '/reading',
  '/book/new',
  '/book/edit/:bookId*',
 ],
}
