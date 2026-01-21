"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, ArrowUp } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function Footer() {
  const { t, locale } = useLanguage()
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    import("@/lib/data-store").then(mod => {
      setSettings(mod.getSiteSettings())
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Varsayılan değerler
  const logoSrc = settings?.logo || "/images/aslan-insaat-logo - son.jpg"
  const logoAlt = settings?.logoAlt || "Aslan İnşaat Logo"
  const description = locale === 'en'
    ? (settings?.siteDescriptionEn || t("footer.description"))
    : (settings?.siteDescription || t("footer.description"))

  const instagram = settings?.instagram || "https://www.instagram.com/aslaninsaat_com"
  const copyright = locale === 'en'
    ? (settings?.copyrightTextEn || `© 2025 Aslan Construction. All rights reserved.`)
    : (settings?.copyrightText || `© 2025 Aslan İnşaat. Tüm hakları saklıdır.`)

  const address = locale === 'en' ? settings?.addressEn : settings?.address
  const phone = settings?.phone || "+90 542 274 05 94"
  const email = settings?.email || "info@aslaninsaat.net"

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={240}
                height={64}
                className="h-16 w-auto object-contain bg-white/10 rounded-lg p-1"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              {description}
            </p>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
                <span>@{instagram.split("/").pop()}</span>
              </a>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hakkimizda" className="hover:text-secondary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="hover:text-secondary transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/projeler" className="hover:text-secondary transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="hover:text-secondary transition-colors">
                  {locale === "en" ? "Catalog" : "Katalog"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>{t("services.residential")}</li>
              <li>{t("services.commercial")}</li>
              <li>{t("services.renovation")}</li>
              <li>{t("services.consulting")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80 whitespace-pre-line">
                  {address || (
                    <>
                      Çakmak Mah. Seyrek Sok. Lina Apt. 17/10
                      <br />
                      Ümraniye, İstanbul
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span className="text-primary-foreground/80">{phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <span className="text-primary-foreground/80">{email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex items-center justify-between text-sm text-primary-foreground/60">
          {/* Sol taraf - Yukarı Ok Butonu */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group"
            aria-label="Yukarı git"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Orta - Copyright */}
          <p className="flex-1 text-center">{copyright}</p>

          {/* Sağ taraf - Boş alan (simetri için) */}
          <div className="w-10"></div>
        </div>
      </div>
    </footer>
  )
}
