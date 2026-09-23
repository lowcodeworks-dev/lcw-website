import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function LegalLayout({
  locale,
  backLabel,
  title,
  lastUpdated,
  lastUpdatedLabel,
  children,
}: {
  locale: string
  backLabel: string
  title: string
  lastUpdated: string
  lastUpdatedLabel: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-background pt-16">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2">{title}</h1>
        <p className="text-sm text-muted-foreground mb-10">{lastUpdatedLabel}: {lastUpdated}</p>

        <div className="space-y-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:text-muted-foreground [&_li]:leading-relaxed [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-foreground [&_a]:hover:text-foreground/80">
          {children}
        </div>
      </div>
    </section>
  )
}
