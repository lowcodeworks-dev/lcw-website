import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const notoKR = Noto_Sans_KR({
  variable: '--font-noto-kr',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'LowCodeWorks — AI-Ready Enterprise Platforms on Mendix',
  description: 'Mendix 11 is purpose-built for enterprise AI. We build the governance and architecture foundation that makes production deployment possible.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${jakarta.variable} ${notoKR.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
