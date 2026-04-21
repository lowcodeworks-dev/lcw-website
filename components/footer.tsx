'use client'

import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="bg-[#17280B] border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-bold text-white">
          LowCode<span className="text-[#F04A00]">Works</span>
        </span>
        <p className="text-sm text-gray-500">{t('tagline')}</p>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} {t('company')}. {t('rights')}
        </p>
      </div>
    </footer>
  )
}
