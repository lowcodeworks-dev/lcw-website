import type { Metadata } from 'next'

const TITLE = 'Digital Transformation Readiness Assessment — LowCodeWorks'
const DESCRIPTION =
  'Find out where your organisation stands across AI readiness, governance, delivery capability, and organisational alignment. Free, no sign-up required. Results in under 10 minutes.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
