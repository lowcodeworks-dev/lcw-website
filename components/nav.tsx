'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Nav({ locale }: { locale: string }) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLocale = locale === 'en' ? 'ko' : 'en'
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const links = [
    { label: t('services'), href: '#services' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <span className="font-bold text-lg tracking-tight text-[#17280B]">
            LowCode<span className="text-[#F04A00]">Works</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-[#17280B] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={otherPath}
            className="text-xs font-semibold tracking-widest text-gray-400 hover:text-[#17280B] transition-colors uppercase"
          >
            {otherLocale}
          </Link>
          <a
            href="#contact"
            className="px-4 py-2 bg-[#F04A00] text-white text-sm font-semibold rounded-full hover:bg-[#d43e00] transition-colors"
          >
            {t('cta')}
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-gray-700 py-2"
            >
              {l.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <Link href={otherPath} className="text-xs font-semibold uppercase text-gray-400">
              {otherLocale}
            </Link>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-[#F04A00] text-white text-sm font-semibold rounded-full"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
