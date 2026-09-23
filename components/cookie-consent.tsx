'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import posthog from 'posthog-js'

// PostHog is initialized with opt_out_capturing_by_default, which makes
// has_opted_out_capturing() true from the start — it can't tell us whether
// the visitor has actually made a choice yet, so we track that ourselves.
const CONSENT_KEY = 'lcw-cookie-consent'

export function CookieConsent({ locale }: { locale: string }) {
  const t = useTranslations('cookie_consent')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    posthog.opt_in_capturing()
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted')
    } catch {}
    setVisible(false)
  }

  function decline() {
    posthog.opt_out_capturing()
    try {
      localStorage.setItem(CONSENT_KEY, 'declined')
    } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-3xl mx-auto bg-foreground text-background rounded-2xl shadow-lg border border-background/10 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-background/80 leading-relaxed flex-1">
          {t('message')}{' '}
          <Link
            href={`/${locale}/privacy`}
            className="underline underline-offset-2 text-background hover:text-background/90"
          >
            {t('privacy_link')}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-background/70 hover:text-background transition-colors"
          >
            {t('decline')}
          </button>
          <button
            type="button"
            onClick={accept}
            className="px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full hover:bg-accent/85 transition-colors"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
