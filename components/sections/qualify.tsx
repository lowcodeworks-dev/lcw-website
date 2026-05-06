'use client'

import { useTranslations } from 'next-intl'

export function Qualify() {
  const t = useTranslations('qualify')

  const items = ['item1', 'item2', 'item3', 'item4'] as const

  return (
    <section className="bg-muted py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start">

          <p className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
            {t('label')}
          </p>

          <div>
            <ul className="space-y-4">
              {items.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="text-muted-foreground select-none shrink-0 mt-0.5">—</span>
                  <span className="text-foreground leading-snug">{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-8 italic">{t('closing')}</p>
          </div>

        </div>
      </div>
    </section>
  )
}
