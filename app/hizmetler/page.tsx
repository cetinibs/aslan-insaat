"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Building2, Building, Wrench, ClipboardList, Home, Factory, Paintbrush, FileText } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function ServicesPage() {
  const { t, locale } = useLanguage()

  const content = locale === "en" ? {
    heroSubtitle: "We offer professional and quality solutions for all your construction needs.",
    residential: {
      title: "Residential Projects",
      desc: "We build modern and safe residential projects turnkey. We have experience in all types of residential construction from detached villas to multi-story apartments.",
      items: [
        "Detached villa projects",
        "Apartment and residence construction",
        "Mass housing projects"
      ]
    },
    commercial: {
      title: "Commercial Buildings",
      desc: "We offer special solutions for business centers, shopping complexes, and industrial structures. We meet your business needs with functional and modern designs.",
      items: [
        "Office and plaza construction",
        "Industrial facility construction",
        "Shopping center projects"
      ]
    },
    renovation: {
      title: "Renovation & Remodeling",
      desc: "We offer renovation and modernization services for your existing structures. We bring a fresh breath to your spaces with detailed planning and meticulous applications.",
      items: [
        "Interior renovation",
        "Facade renovation",
        "Restoration projects"
      ]
    },
    consulting: {
      title: "Project Consulting",
      desc: "We provide professional consulting services for your construction projects. We are with you at every step from planning to post-delivery.",
      items: [
        "Project planning and design",
        "Budgeting and cost analysis",
        "Site management"
      ]
    },
    processTitle: "Our Working Process",
    processSubtitle: "The systematic approach we follow in every project",
    steps: [
      { title: "Initial Meeting", desc: "We listen to your needs and evaluate your project" },
      { title: "Planning", desc: "We prepare a detailed project plan and budget" },
      { title: "Implementation", desc: "We bring the project to life with our professional team" },
      { title: "Delivery", desc: "We deliver your project on time and completely" }
    ]
  } : {
    heroSubtitle: "Her türlü inşaat ihtiyacınız için profesyonel ve kaliteli çözümler sunuyoruz.",
    residential: {
      title: "Konut Projeleri",
      desc: "Modern ve güvenli konut projelerini anahtar teslim olarak hayata geçiriyoruz. Müstakil villalardan çok katlı apartmanlara kadar her türlü konut inşaatında deneyimliyiz.",
      items: [
        "Müstakil villa projeleri",
        "Apartman ve rezidans inşaatı",
        "Toplu konut projeleri"
      ]
    },
    commercial: {
      title: "Ticari Binalar",
      desc: "İş merkezleri, alışveriş kompleksleri ve endüstriyel yapılar için özel çözümler sunuyoruz. Fonksiyonel ve modern tasarımlarla işletmenizin ihtiyaçlarını karşılıyoruz.",
      items: [
        "Ofis ve plaza inşaatı",
        "Endüstriyel tesis yapımı",
        "Alışveriş merkezi projeleri"
      ]
    },
    renovation: {
      title: "Tadilat & Renovasyon",
      desc: "Mevcut yapılarınızı yenileme ve modernize etme hizmetleri sunuyoruz. Detaylı planlama ve titiz uygulamalarla mekanlarınıza yeni bir soluk getiriyoruz.",
      items: [
        "İç mekan yenileme",
        "Cephe renovasyonu",
        "Restorasyon projeleri"
      ]
    },
    consulting: {
      title: "Proje Danışmanlığı",
      desc: "İnşaat projeleriniz için profesyonel danışmanlık hizmeti veriyoruz. Planlama aşamasından teslimat sonrasına kadar her adımda yanınızdayız.",
      items: [
        "Proje planlama ve tasarım",
        "Bütçeleme ve maliyet analizi",
        "Şantiye yönetimi"
      ]
    },
    processTitle: "Çalışma Sürecimiz",
    processSubtitle: "Her projede izlediğimiz sistematik yaklaşım",
    steps: [
      { title: "İlk Görüşme", desc: "İhtiyaçlarınızı dinliyor ve projenizi değerlendiriyoruz" },
      { title: "Planlama", desc: "Detaylı proje planı ve bütçe hazırlıyoruz" },
      { title: "Uygulama", desc: "Profesyonel ekibimizle projeyi hayata geçiriyoruz" },
      { title: "Teslim", desc: "Projenizi zamanında ve eksiksiz teslim ediyoruz" }
    ]
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-balance">{t("servicesPage.title")}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Building2 className="mb-6" size={48} />
              <h2 className="text-3xl font-semibold mb-4">{content.residential.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {content.residential.desc}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Home size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.residential.items[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.residential.items[1]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.residential.items[2]}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Building className="mb-6" size={48} />
              <h2 className="text-3xl font-semibold mb-4">{content.commercial.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {content.commercial.desc}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Building size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.commercial.items[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Factory size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.commercial.items[1]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.commercial.items[2]}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <Wrench className="mb-6" size={48} />
              <h2 className="text-3xl font-semibold mb-4">{content.renovation.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {content.renovation.desc}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Paintbrush size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.renovation.items[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.renovation.items[1]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Wrench size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.renovation.items[2]}</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <ClipboardList className="mb-6" size={48} />
              <h2 className="text-3xl font-semibold mb-4">{content.consulting.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {content.consulting.desc}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <FileText size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.consulting.items[0]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <ClipboardList size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.consulting.items[1]}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Building2 size={20} className="mt-0.5 flex-shrink-0" />
                  <span>{content.consulting.items[2]}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">{content.processTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {content.processSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {content.steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-semibold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
