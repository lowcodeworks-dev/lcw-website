import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Transformation Readiness Assessment — LowCodeWorks',
  description:
    'Find out where your organisation stands across AI readiness, governance, delivery capability, and organisational alignment. Free, no sign-up required. Results in under 10 minutes.',
}

export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
