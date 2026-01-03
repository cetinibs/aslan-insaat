"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function Footer() {
  const { t, locale } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="inline-block mb-4">
              <img
                src="/images/aslan-insaat-logo - son.jpg"
                alt="Aslan İnşaat Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">
              {t("footer.description")}
            </p>
            <a
              href="https://www.instagram.com/aslaninsaat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-secondary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
              <span>@aslaninsaat</span>
            </a>
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
                <span className="text-primary-foreground/80">
                  Çakmak Mah. Seyrek Sok. Lina Apt. 17/10
                  <br />
                  Ümraniye, İstanbul
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="flex-shrink-0" />
                <span className="text-primary-foreground/80">+90 542 274 05 94</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="flex-shrink-0" />
                <span className="text-primary-foreground/80">info@aslaninsaat.net</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2025 Aslan İnşaat. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
