import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/config'

type RouteConfig = {
  path: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>
  priority: number
}

const ROUTES: RouteConfig[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/assessment', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: locale === routing.defaultLocale ? route.priority : route.priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${route.path}`])
        ),
      },
    }))
  )
}
