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
  const englishOnlyNotice = locale !== 'en' ? t('english_only_notice') : undefined

  return (
    <LegalLayout
      locale={locale}
      backLabel={t('back')}
      title={t('privacy_title')}
      lastUpdated={LAST_UPDATED}
      englishOnlyNotice={englishOnlyNotice}
    >
      <div>
        <h2>1. Who we are</h2>
        <p>
          LowCodeWorks LTD (&quot;LowCodeWorks&quot;, &quot;we&quot;, &quot;us&quot;) is registered in South
          Korea and operates the website at lowcodeworks.consulting, including the free Digital
          Transformation Readiness Assessment. This policy explains what personal data we collect
          through this website, why we collect it, and what rights you have over it.
        </p>
      </div>

      <div>
        <h2>2. Information we collect</h2>
        <p><strong>Information you provide directly</strong> — when you take the Readiness Assessment or contact us, we collect:</p>
        <ul>
          <li>Your name, email address, and company name (company is optional)</li>
          <li>Any message you choose to leave us</li>
          <li>Your answers to the assessment questions and the resulting scores</li>
        </ul>
        <p><strong>Information collected automatically</strong> — when you browse the site, we (and the service providers listed below) may automatically collect:</p>
        <ul>
          <li>IP address, browser type, device type, and general location (country/city level)</li>
          <li>Pages visited, referring pages, and how you interact with the site</li>
          <li>A randomly generated session identifier used to measure the assessment funnel</li>
        </ul>
      </div>

      <div>
        <h2>3. How we use your information</h2>
        <ul>
          <li>To generate and email you your assessment results</li>
          <li>To respond to your enquiry and follow up about a potential engagement</li>
          <li>To operate, secure, and improve this website (including detecting spam and abuse)</li>
          <li>To understand, in aggregate, how visitors use the site</li>
        </ul>
        <p>We do not sell your personal data, and we do not use it for third-party advertising.</p>
      </div>

      <div>
        <h2>4. Cookies and similar technologies</h2>
        <p>
          We use a small number of cookies and browser-storage identifiers. Strictly necessary ones
          (for example, the security check that protects our contact form from spam) are always
          active, since the site can&apos;t function properly without them. Analytics cookies are
          only set after you accept them in the cookie banner shown on your first visit — you can
          decline them, and you can change your mind at any time by clearing your browser&apos;s
          site data for this domain.
        </p>
        <ul>
          <li><strong>Strictly necessary:</strong> Cloudflare Turnstile (spam/bot protection on our forms)</li>
          <li><strong>Analytics (consent-based):</strong> PostHog (see below)</li>
          <li><strong>Analytics (cookieless):</strong> Vercel Analytics, which does not use cookies or store any personally identifying data</li>
        </ul>
      </div>

      <div>
        <h2>5. Third parties we work with</h2>
        <p>We share the minimum data necessary with the following service providers, each acting under its own privacy policy and, where applicable, a data processing agreement with us:</p>
        <ul>
          <li><strong>Resend</strong> — sends the assessment result email to you and a notification email to us</li>
          <li><strong>PostHog</strong> (EU region) — product analytics, used only if you accept analytics cookies</li>
          <li><strong>Cloudflare Turnstile</strong> — verifies you&apos;re not a bot when submitting a form</li>
          <li><strong>Upstash</strong> — briefly stores your IP address to rate-limit form submissions and prevent abuse</li>
          <li><strong>Vercel Analytics</strong> — anonymous, cookieless page-view analytics</li>
          <li><strong>LCW Workspace</strong> (our internal CRM) — stores assessment submissions so we can follow up with you</li>
        </ul>
      </div>

      <div>
        <h2>6. Data retention</h2>
        <p>
          We keep assessment and contact submissions for as long as reasonably necessary to respond
          to you and maintain a record of prospective engagements, and delete them on request. Rate-limiting
          data is retained for at most one hour. Analytics data is retained according to each provider&apos;s
          standard retention period.
        </p>
      </div>

      <div>
        <h2>7. International data transfers</h2>
        <p>
          Our service providers may process data outside your home country, including in the EU and
          the United States. Where required, we rely on providers that offer appropriate safeguards
          such as Standard Contractual Clauses (PostHog processes analytics data in the EU region).
        </p>
      </div>

      <div>
        <h2>8. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or export
          your personal data, and to object to or restrict certain processing. If you are in the EU/EEA,
          these rights arise under the GDPR; if you are in South Korea, under the Personal Information
          Protection Act (PIPA). To exercise any of these rights, contact us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>

      <div>
        <h2>9. Security</h2>
        <p>
          We use industry-standard measures — including HTTPS encryption, security headers, and
          rate limiting — to protect the data you share with us. No method of transmission or storage
          is completely secure, but we work to protect your data appropriately.
        </p>
      </div>

      <div>
        <h2>10. Children&apos;s privacy</h2>
        <p>This website is intended for business professionals and is not directed at children. We do not knowingly collect personal data from children.</p>
      </div>

      <div>
        <h2>11. Changes to this policy</h2>
        <p>We may update this policy from time to time. Material changes will be reflected by updating the &quot;Last updated&quot; date above.</p>
      </div>

      <div>
        <h2>12. Contact us</h2>
        <p>
          Questions about this policy or your data? Email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or write to LowCodeWorks LTD,
          306 Apgujeong-ro, Gangnam-gu, Seoul, Republic of Korea.
        </p>
      </div>
    </LegalLayout>
  )
}
