"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Instagram, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useLanguage } from "@/lib/i18n"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    // Scroll handler
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)

    // Site ayarlarını yükle
    import("@/lib/data-store").then(mod => {
      setSettings(mod.getSiteSettings())
    })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Varsayılan değerler (ayarlar yüklenene kadar veya yoksa)
  const logoSrc = settings?.logo || "/images/aslan-insaat-logo - son.jpg"
  const logoAlt = settings?.logoAlt || "Aslan İnşaat Logo"
  const instagramLink = settings?.instagram || "https://www.instagram.com/aslaninsaat"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? "bg-gradient-to-r from-slate-900/90 via-blue-900/80 to-slate-900/90 backdrop-blur-md shadow-lg"
        : "bg-gradient-to-r from-slate-900/70 via-blue-900/60 to-slate-900/70 backdrop-blur-sm"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={200}
              height={56}
              className="h-14 w-auto object-contain border-2 border-amber-500/70 rounded-lg shadow-md bg-white/10"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/hakkimizda" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/hizmetler" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.services")}
            </Link>
            <Link href="/projeler" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.projects")}
            </Link>
            <Link href="/sss" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.faq")}
            </Link>
            <Link href="/blog" className="text-sm font-medium text-white hover:text-primary transition-colors">
              {t("nav.blog")}
            </Link>
            {instagramLink && (
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            )}
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Link href="/teklif">
              <Button size="sm" className="font-medium bg-amber-500 hover:bg-amber-600 text-white transition-colors">
                <FileText size={16} className="mr-1" />
                {t("nav.getQuote")}
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button size="sm" className="font-medium gradient-primary hover:opacity-90 transition-opacity">
                {t("nav.contact")}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Enhanced with slide animation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-white/20 bg-gray-900/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href="/hakkimizda"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.about")}
              </Link>
              <Link
                href="/hizmetler"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.services")}
              </Link>
              <Link
                href="/projeler"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.projects")}
              </Link>
              <Link
                href="/sss"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.faq")}
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("nav.blog")}
              </Link>
              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium text-white hover:text-primary transition-colors px-2 py-1 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Instagram size={20} />
                  Instagram
                </a>
              )}
              <div className="px-2 py-1">
                <LanguageSwitcher variant="footer" />
              </div>
              <Link href="/teklif" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full font-medium bg-amber-500 hover:bg-amber-600 text-white">
                  <FileText size={16} className="mr-1" />
                  {t("nav.getQuote")}
                </Button>
              </Link>
              <Link href="/iletisim" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full font-medium gradient-primary">
                  {t("nav.contact")}
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
