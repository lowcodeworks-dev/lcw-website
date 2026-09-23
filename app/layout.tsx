import type { Metadata } from 'next'
import { JetBrains_Mono, Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import { SITE_URL } from '@/lib/config'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const notoKR = Noto_Sans_KR({
  variable: '--font-noto-kr',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const TITLE = 'LowCodeWorks — Enterprise Digital Transformation'
const DESCRIPTION = 'We help enterprises build the foundation for AI-ready digital transformation — strategy, governance, and execution on modern low-code platforms.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'LowCodeWorks',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${jetbrainsMono.variable} ${notoKR.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
