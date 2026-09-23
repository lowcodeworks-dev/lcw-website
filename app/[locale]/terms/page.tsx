import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LegalLayout } from '@/components/legal/legal-layout'

const LAST_UPDATED = 'September 23, 2026'
const CONTACT_EMAIL = 'info@lowcodeworks.consulting'

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
  const englishOnlyNotice = locale !== 'en' ? t('english_only_notice') : undefined

  return (
    <LegalLayout
      locale={locale}
      backLabel={t('back')}
      title={t('terms_title')}
      lastUpdated={LAST_UPDATED}
      englishOnlyNotice={englishOnlyNotice}
    >
      <div>
        <h2>1. Acceptance of these terms</h2>
        <p>
          These terms govern your use of the website operated by LowCodeWorks LTD
          (&quot;LowCodeWorks&quot;, &quot;we&quot;, &quot;us&quot;) at lowcodeworks.consulting. By using this
          site, including the Digital Transformation Readiness Assessment, you agree to these terms.
          If you do not agree, please do not use the site.
        </p>
      </div>

      <div>
        <h2>2. Use of this website</h2>
        <p>
          You may use this website for lawful purposes only. You agree not to misuse the site —
          including attempting to bypass our security controls, submitting false information through
          our forms, or using automated means to scrape or overload the site.
        </p>
      </div>

      <div>
        <h2>3. Intellectual property</h2>
        <p>
          All content on this site — text, graphics, logos, and the assessment methodology — is the
          property of LowCodeWorks or its licensors and is protected by intellectual property law. You
          may view and share this content for personal, non-commercial reference, but may not
          reproduce, modify, or redistribute it without our prior written consent.
        </p>
      </div>

      <div>
        <h2>4. The Readiness Assessment</h2>
        <p>
          The Digital Transformation Readiness Assessment is a free, self-serve tool that provides a
          general, indicative view of where your organisation stands based on the answers you give
          it. It is provided for informational purposes only, does not constitute professional advice,
          and should not be relied on as a substitute for a proper engagement or consultation.
        </p>
      </div>

      <div>
        <h2>5. No engagement created by use of this site</h2>
        <p>
          Browsing this site, taking the assessment, or sending us a message does not, by itself,
          create any client relationship, contract, or obligation on either side. Any paid engagement
          with LowCodeWorks is agreed separately, in writing, and is governed by its own terms.
        </p>
      </div>

      <div>
        <h2>6. Third-party links and services</h2>
        <p>
          This site may link to, or rely on, third-party services (for example, email delivery,
          analytics, and bot protection, as described in our Privacy Policy). We are not responsible
          for the content, availability, or practices of third-party websites or services.
        </p>
      </div>

      <div>
        <h2>7. Disclaimer of warranties</h2>
        <p>
          This website and the assessment tool are provided &quot;as is&quot;, without warranties of any
          kind, express or implied, including as to accuracy, completeness, or fitness for a particular
          purpose. We do not warrant that the site will be uninterrupted or error-free.
        </p>
      </div>

      <div>
        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, LowCodeWorks shall not be liable for any indirect,
          incidental, or consequential damages arising from your use of, or inability to use, this
          website or the assessment tool.
        </p>
      </div>

      <div>
        <h2>9. Indemnification</h2>
        <p>
          You agree to indemnify and hold LowCodeWorks harmless from any claims, losses, or damages
          arising from your misuse of this website or your violation of these terms.
        </p>
      </div>

      <div>
        <h2>10. Governing law</h2>
        <p>
          These terms are governed by the laws of the Republic of Korea, without regard to conflict-of-law
          principles. Any dispute arising from these terms or your use of this site shall be subject to
          the exclusive jurisdiction of the courts of the Republic of Korea.
        </p>
      </div>

      <div>
        <h2>11. Changes to these terms</h2>
        <p>We may update these terms from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date above.</p>
      </div>

      <div>
        <h2>12. Contact us</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,
          or write to LowCodeWorks LTD, 306 Apgujeong-ro, Gangnam-gu, Seoul, Republic of Korea.
        </p>
      </div>
    </LegalLayout>
  )
}
