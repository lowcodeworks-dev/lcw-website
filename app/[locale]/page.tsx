import { Hero } from '@/components/sections/hero'
import { AssessmentBanner } from '@/components/sections/assessment-banner'
import { Credibility } from '@/components/sections/credibility'
import { InflectionPoint } from '@/components/sections/inflection-point'
import { Problem } from '@/components/sections/problem'
import { Services } from '@/components/sections/services'
import { AssessmentCta } from '@/components/sections/assessment-cta'
import { PlatformPreview } from '@/components/sections/platform-preview'
import { HowWeWork } from '@/components/sections/how-we-work'
import { SocialProof } from '@/components/sections/social-proof'
import { About } from '@/components/sections/about'
import { FAQ } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <InflectionPoint />
      <AssessmentBanner />
      <Credibility />
      <SocialProof />
      <Problem />
      <Services />
      <AssessmentCta />
      <PlatformPreview />
      <HowWeWork />
      <About />
      <FAQ />
      <Contact />
    </>
  )
}
