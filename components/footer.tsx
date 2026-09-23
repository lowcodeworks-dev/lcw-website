'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SeoulClock } from '@/components/seoul-clock'

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer')

  return (
    <footer className="bg-foreground border-t border-background/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-background">LowCodeWorks</span>
          <span className="text-xs text-background/50">LowCodeWorks LTD · Registered in South Korea</span>
          <span className="text-xs text-background/30">306 Apgujeong-ro, Gangnam-gu</span>
          <span className="text-xs text-background/30">Seoul, Republic of Korea</span>
        </div>
        <div className="hidden md:block">
          <SeoulClock />
        </div>
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="text-xs text-background/50 hover:text-background/80 transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-xs text-background/50 hover:text-background/80 transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
          <p className="text-xs text-background/30">
            © {new Date().getFullYear()} {t('company')}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
