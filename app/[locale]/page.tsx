import { Hero } from '@/components/sections/hero'
import { Credibility } from '@/components/sections/credibility'
import { Problem } from '@/components/sections/problem'
import { Services } from '@/components/sections/services'
import { PlatformPreview } from '@/components/sections/platform-preview'
import { HowWeWork } from '@/components/sections/how-we-work'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Credibility />
      <Problem />
      <Services />
      <PlatformPreview />
      <HowWeWork />
      <About />
      <Contact />
    </>
  )
}
