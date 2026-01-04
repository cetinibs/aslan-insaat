"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Users, Award, TrendingUp, ArrowRight, Star, Zap, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"

export default function HomePage() {
  const { t, locale } = useLanguage()

  const stats = [
    { number: "25+", label: t("stats.yearsExperience"), icon: Award },
    { number: "150+", label: t("stats.projectsCompleted"), icon: Building2 },
    { number: "500+", label: t("stats.happyClients"), icon: Users },
    { number: "%98", label: t("stats.satisfaction"), icon: Star },
  ]

  const services = [
    {
      icon: Building2,
      title: t("services.residential"),
      desc: t("services.residentialDesc"),
      color: "from-blue-500/10 to-purple-500/10",
    },
    {
      icon: Users,
      title: t("services.commercial"),
      desc: t("services.commercialDesc"),
      color: "from-purple-500/10 to-pink-500/10",
    },
    {
      icon: Award,
      title: t("services.renovation"),
      desc: t("services.renovationDesc"),
      color: "from-pink-500/10 to-red-500/10",
    },
    {
      icon: TrendingUp,
      title: t("services.consulting"),
      desc: t("services.consultingDesc"),
      color: "from-red-500/10 to-orange-500/10",
    },
  ]

  const whyUs = [
    {
      icon: Zap,
      title: t("why.fast"),
      desc: t("why.fastDesc"),
    },
    {
      icon: Shield,
      title: t("why.quality"),
      desc: t("why.qualityDesc"),
    },
    {
      icon: Clock,
      title: t("why.support"),
      desc: t("why.supportDesc"),
    },
  ]

  const projects = [
    {
      title: "SULTANBEYLİ PROJESİ",
      type: locale === "en" ? "Residential" : "Konut Projesi",
      year: "2024",
      status: t("projects.completed"),
      image: "/eyupcan-apartmani.jpeg",
    },
    {
      title: "ATAŞEHİR PROJESİ",
      type: locale === "en" ? "Commercial & Residential" : "Konut ve Ticari",
      year: "2023",
      status: t("projects.completed"),
      image: "/mustafa-kemal.jpeg",
    },
  ]

  const testimonials = locale === "en" ? [
    {
      name: "Ahmet Yılmaz",
      project: "Villa Bodrum - 2023",
      text: "Working with Aslan Construction was a great pleasure. Our villa project was completed on time and exceeded our expectations. Thank you for the professional team, quality workmanship, and transparent communication.",
      initial: "AY",
    },
    {
      name: "Zeynep Demir",
      project: "Office Tower İzmir - 2024",
      text: "We were very satisfied with Aslan Construction's expertise in building our office. They are truly professionals in technical knowledge, project management, and quality control.",
      initial: "ZD",
    },
    {
      name: "Mehmet Kara",
      project: "Residence İstanbul - 2024",
      text: "Thanks to Aslan Construction's experience and reliability, we had a smooth process in our residence project. Regular reporting and transparent cost management were very valuable.",
      initial: "MK",
    },
  ] : [
    {
      name: "Ahmet Yılmaz",
      project: "Villa Bodrum - 2023",
      text: "Aslan İnşaat ile çalışmak büyük bir keyifti. Villa projemiz zamanında ve beklentilerimizin üzerinde tamamlandı. Profesyonel ekip, kaliteli işçilik ve şeffaf iletişim için teşekkürler.",
      initial: "AY",
    },
    {
      name: "Zeynep Demir",
      project: "Office Tower İzmir - 2024",
      text: "Ofis binamızın inşaatında Aslan İnşaat'ın uzmanlığından çok memnun kaldık. Teknik bilgi, proje yönetimi ve kalite kontrol konularında gerçekten profesyoneller.",
      initial: "ZD",
    },
    {
      name: "Mehmet Kara",
      project: "Residence İstanbul - 2024",
      text: "Rezidans projemizde Aslan İnşaat'ın deneyimi ve güvenilirliği sayesinde sorunsuz bir süreç yaşadık. Düzenli raporlama ve şeffaf maliyet yönetimi çok değerliydi.",
      initial: "MK",
    },
  ]

  const faqItems = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <HeroSlider />

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass backdrop-blur-md p-6 rounded-2xl text-center bg-card border hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              >
                <stat.icon className="mx-auto mb-3 text-primary" size={32} />
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              {t("services.title")}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{t("services.subtitle")}</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty">
              {t("services.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`group p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 relative overflow-hidden`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="text-primary" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
                  <Link
                    href="/hizmetler"
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all"
                  >
                    {t("services.moreInfo")} <ArrowRight size={18} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{t("why.title")}</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t("why.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyUs.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-3xl bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-full gradient-primary mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="text-primary-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              {t("projects.title")}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              {t("projects.subtitle")}
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t("projects.description")}
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {/* Large Featured Project - CUMHURİYET MAHALLESİ */}
            <Link
              href="/projeler"
              className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl aspect-square md:aspect-auto"
            >
              <Image
                src="/ersa-orman-evleri.png"
                alt="CUMHURİYET MAHALLESİ PROJESİ"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="inline-block px-3 py-1 bg-primary rounded-full text-xs font-semibold mb-3">
                  {t("projects.ongoing")}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-2">CUMHURİYET MAHALLESİ PROJESİ</h3>
                <p className="text-white/80 text-lg">{locale === "en" ? "Residential Project" : "Konut Projesi"} • 2025</p>
              </div>
            </Link>

            {/* Other Projects */}
            {projects.map((project, index) => (
              <Link
                key={index}
                href="/projeler"
                className="group relative overflow-hidden rounded-3xl aspect-square"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div
                    className={`inline-block px-3 py-1 ${project.status === t("projects.completed") ? "bg-primary" : "bg-secondary"} rounded-full text-xs font-semibold mb-2`}
                  >
                    {project.status}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{project.title}</h3>
                  <p className="text-white/80 text-sm">
                    {project.type} • {project.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/projeler">
              <Button
                size="lg"
                variant="outline"
                className="font-medium text-base px-8 py-6 h-auto hover:scale-105 transition-transform bg-transparent"
              >
                {t("projects.viewAll")}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{t("testimonials.title")}</h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
              {t("testimonials.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center font-bold text-white text-lg">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.project}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">{t("faq.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("faq.subtitle")}</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-3">{item.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="gradient-primary p-12 md:p-20 rounded-3xl text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                {t("cta.title")}
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/iletisim">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-medium text-base px-8 py-6 h-auto hover:scale-105 transition-transform"
                  >
                    {t("cta.contact")}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/katalog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-medium text-base px-8 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-sm"
                  >
                    {t("cta.catalog")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div >
  )
}
