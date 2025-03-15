import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function authMiddleware(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return null
}

export function loggerMiddleware(request: NextRequest) {
  console.log(`Request to ${request.url} at ${new Date().toISOString()}`)

  return null
}
export async function publicPageRedirectMiddleware(request: NextRequest) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value
  const refreshToken = cookieStore.get("refreshToken")?.value

  if (
    (accessToken || refreshToken) &&
    (request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === "/auth/login" ||
      request.nextUrl.pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return null
}

export async function middleware(request: NextRequest) {
  const logResult = loggerMiddleware(request)
  if (logResult) return logResult

  const authResult = await authMiddleware(request)
  if (authResult) return authResult

  const publicPageResult = await publicPageRedirectMiddleware(request)
  if (publicPageResult) return publicPageResult

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
}
