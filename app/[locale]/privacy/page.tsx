import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LegalLayout } from '@/components/legal/legal-layout'
import { PrivacyContent } from '@/components/legal/privacy-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })
  return {
    title: `${t('privacy_title')} — LowCodeWorks`,
    description: 'How LowCodeWorks collects, uses, and protects your personal data.',
    robots: { index: true, follow: true },
  }
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })

  return (
    <LegalLayout
      locale={locale}
      backLabel={t('back')}
      title={t('privacy_title')}
      lastUpdatedLabel={t('last_updated')}
      lastUpdated={t('last_updated_date')}
    >
      <PrivacyContent locale={locale} />
    </LegalLayout>
  )
}
