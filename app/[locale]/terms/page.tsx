import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LegalLayout } from '@/components/legal/legal-layout'
import { TermsContent } from '@/components/legal/terms-content'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal' })
  return {
    title: `${t('terms_title')} — LowCodeWorks`,
    description: 'The terms that govern your use of the LowCodeWorks website.',
    robots: { index: true, follow: true },
  }
}

export default async function TermsPage({
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
      title={t('terms_title')}
      lastUpdatedLabel={t('last_updated')}
      lastUpdated={t('last_updated_date')}
    >
      <TermsContent locale={locale} />
    </LegalLayout>
  )
}
