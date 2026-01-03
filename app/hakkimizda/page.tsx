"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Award, Users, Target, Shield, Medal, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n"

export default function AboutPage() {
  const { t, locale } = useLanguage()

  const values = [
    {
      icon: Award,
      title: t("about.quality"),
      desc: t("about.qualityDesc"),
    },
    {
      icon: Shield,
      title: t("about.reliability"),
      desc: t("about.reliabilityDesc"),
    },
    {
      icon: Users,
      title: t("about.collaboration"),
      desc: t("about.collaborationDesc"),
    },
    {
      icon: Target,
      title: t("about.goalOriented"),
      desc: t("about.goalOrientedDesc"),
    },
  ]

  const certificates = locale === "en" ? [
    { icon: Medal, title: "ISO 9001:2015", desc: "Quality Management System Certificate" },
    { icon: Award, title: "ISO 14001:2015", desc: "Environmental Management System Certificate" },
    { icon: Shield, title: "OHSAS 18001", desc: "Occupational Health and Safety Certificate" },
    { icon: CheckCircle2, title: "TSE Service Qualification", desc: "Turkish Standards Institute Certificate" },
    { icon: Award, title: "Construction Company of the Year 2023", desc: "Construction Industry Association Award" },
    { icon: Medal, title: "Golden Architect Award", desc: "Best Residential Project 2024" },
  ] : [
    { icon: Medal, title: "ISO 9001:2015", desc: "Kalite Yönetim Sistemi Sertifikası" },
    { icon: Award, title: "ISO 14001:2015", desc: "Çevre Yönetim Sistemi Sertifikası" },
    { icon: Shield, title: "OHSAS 18001", desc: "İş Sağlığı ve Güvenliği Sertifikası" },
    { icon: CheckCircle2, title: "TSE Hizmet Yeterlilik", desc: "Türk Standardları Enstitüsü Belgesi" },
    { icon: Award, title: "Yılın İnşaat Firması 2023", desc: "İnşaat Sektörü Derneği Ödülü" },
    { icon: Medal, title: "Altın Mimar Ödülü", desc: "En İyi Konut Projesi 2024" },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-balance">{t("about.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-semibold mb-6 text-balance">{t("about.storyTitle")}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("about.storyP1")}</p>
                <p>{t("about.storyP2")}</p>
                <p>{t("about.storyP3")}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/construction-team-meeting.png" alt={locale === "en" ? "Team" : "Ekip"} className="w-full h-64 object-cover" />
              <img src="/building-construction-process.jpg" alt={locale === "en" ? "Construction" : "İnşaat"} className="w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">{t("about.valuesTitle")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("about.valuesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground mb-4">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">{t("about.certificatesTitle")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("about.certificatesSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {certificates.map((cert, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-muted mb-6 mx-auto">
                  <cert.icon size={40} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cert.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
