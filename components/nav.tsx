'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import posthog from 'posthog-js'

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-8 h-8" />

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

const LOCALES = ['en', 'ko', 'ja'] as const
type Locale = (typeof LOCALES)[number]

export function Nav({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function localePath(target: Locale) {
    return pathname.replace(`/${locale}`, `/${target}`)
  }

  const links = [
    { label: t('services'), href: '#services' },
    { label: t('work'), href: '#work' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-foreground">
            LowCodeWorks
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-xs font-semibold tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
            >
              {locale}
              <ChevronDown className="h-3 w-3" />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-8 bg-background border border-border rounded-lg shadow-sm py-1 min-w-[60px]">
                {LOCALES.filter((l) => l !== locale).map((l) => (
                  <Link
                    key={l}
                    href={localePath(l)}
                    onClick={() => setLangOpen(false)}
                    className="block px-3 py-1.5 text-xs font-semibold uppercase text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />

          <a
            href="#contact"
            onClick={() => posthog.capture('nav_cta_clicked', { location: 'desktop_nav' })}
            className="px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full hover:bg-accent/85 transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-foreground py-2"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <ThemeToggle />
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={localePath(l)}
                onClick={() => setOpen(false)}
                className={`text-xs font-semibold uppercase transition-colors ${
                  l === locale ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {l}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="ml-auto px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
