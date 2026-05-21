import { Hero } from '@/components/sections/hero'
import { Credibility } from '@/components/sections/credibility'
import { SocialProof } from '@/components/sections/social-proof'
import { Problem } from '@/components/sections/problem'
import { InflectionPoint } from '@/components/sections/inflection-point'
import { Services } from '@/components/sections/services'
import { AssessmentCta } from '@/components/sections/assessment-cta'
import { PlatformPreview } from '@/components/sections/platform-preview'
import { HowWeWork } from '@/components/sections/how-we-work'
import { About } from '@/components/sections/about'
import { FAQ } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Credibility />
      <SocialProof />
      <Problem />
      <InflectionPoint />
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
