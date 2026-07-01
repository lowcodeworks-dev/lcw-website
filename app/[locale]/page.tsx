import { Hero } from '@/components/sections/hero'
import { Locations } from '@/components/sections/locations'
import { Credibility } from '@/components/sections/credibility'
import { SocialProof } from '@/components/sections/social-proof'
import { InflectionPoint } from '@/components/sections/inflection-point'
import { Services } from '@/components/sections/services'
import { AssessmentCta } from '@/components/sections/assessment-cta'
import { About } from '@/components/sections/about'
import { FAQ } from '@/components/sections/faq'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Locations />
      <Credibility />
      <SocialProof />
      <InflectionPoint />
      <Services />
      <AssessmentCta />
      <About />
      <FAQ />
      <Contact />
    </>
  )
}
