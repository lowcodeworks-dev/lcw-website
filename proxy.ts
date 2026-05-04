import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

const COUNTRY_TO_LOCALE: Record<string, string> = {
  KR: 'ko',
  JP: 'ja',
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only apply geo-detection when there's no locale prefix yet (i.e. fresh visit to the root domain)
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!hasLocalePrefix) {
    const country = request.headers.get('x-vercel-ip-country') ?? ''
    const locale = COUNTRY_TO_LOCALE[country] ?? routing.defaultLocale

    if (locale !== routing.defaultLocale) {
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
      return NextResponse.redirect(url)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
