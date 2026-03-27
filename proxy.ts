import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const canonicalHost = "voyatrail.com"
const redirectHosts = new Set(["www.voyatrail.com"])

export function proxy(request: NextRequest) {
  const { nextUrl } = request

  if (redirectHosts.has(nextUrl.hostname)) {
    const redirectUrl = nextUrl.clone()
    redirectUrl.hostname = canonicalHost
    return NextResponse.redirect(redirectUrl, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}
