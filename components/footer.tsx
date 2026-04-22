'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-foreground border-t border-background/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-background">
          LowCodeWorks
        </span>
        <p className="text-sm text-background/40">{t('tagline')}</p>
        <p className="text-xs text-background/30">
          © {new Date().getFullYear()} {t('company')}. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
