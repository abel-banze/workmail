import { NextResponse, type NextRequest } from "next/server"
import { locales, PUBLIC_ROUTES } from "./routes"

// This middleware runs without the auth wrapper
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow direct access to assets and system files
  if (
    pathname.startsWith("/assets/") ||
    pathname.startsWith("/api/auth") || // Allow auth API routes
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next()
  }

  // If the route is a known non-localized public route, allow it
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if the route already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // If no locale is found, add one
  if (!pathnameHasLocale) {
    const locale = getLocale(req)
    req.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(req.nextUrl)
  }

  // For auth-protected routes, we'll handle this in the page components
  // using the useSession hook or getServerSession

  return NextResponse.next()
}

// Helper function to get locale from request
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")

  if (acceptLanguage) {
    const acceptedLanguages = acceptLanguage.split(",").map((lang) => lang.split(";")[0].trim())
    for (const locale of acceptedLanguages) {
      if (locales.includes(locale)) {
        return locale
      }
    }
  }
  return "pt" // Default locale
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}

