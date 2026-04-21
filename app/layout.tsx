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
  title: 'LowCodeWorks — Mendix Consulting',
  description: 'Two Mendix Experts from the Netherlands, based in Seoul. We help enterprises build the internal platform teams that don\'t need us tomorrow.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${jakarta.variable} ${notoKR.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
