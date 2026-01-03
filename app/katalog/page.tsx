"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

export default function CatalogPage() {
  const { locale } = useLanguage()

  const content = locale === "en" ? {
    title: "Catalog",
    subtitle: "You can browse our product and services catalog, and download it for detailed information.",
    galleryTitle: "Image Gallery",
    gallerySubtitle: "Selected photos from our projects",
    catalogs: [
      {
        title: "Residential Projects Catalog",
        description: "Detailed information, images, and technical specifications about our residential projects.",
        downloadText: "Download (PDF, 12 MB)",
      },
      {
        title: "Commercial Buildings Catalog",
        description: "Details of our office, plaza, and industrial building projects.",
        downloadText: "Download (PDF, 15 MB)",
      },
      {
        title: "Renovation & Remodeling",
        description: "Before and after images from our renovation projects.",
        downloadText: "Download (PDF, 8 MB)",
      },
      {
        title: "Corporate Presentation",
        description: "Company introduction, references, and quality certificates.",
        downloadText: "Download (PDF, 6 MB)",
      },
      {
        title: "Technical Specifications",
        description: "Our construction materials and implementation standards.",
        downloadText: "Download (PDF, 10 MB)",
      },
      {
        title: "Price List 2025",
        description: "Our current service prices and package options.",
        downloadText: "Download (PDF, 2 MB)",
      },
    ],
  } : {
    title: "Katalog",
    subtitle: "Ürün ve hizmet kataloğumuzu inceleyebilir, detaylı bilgi için indirebilirsiniz.",
    galleryTitle: "Görsel Galeri",
    gallerySubtitle: "Projelerimizden seçkin fotoğraflar",
    catalogs: [
      {
        title: "Konut Projeleri Kataloğu",
        description: "Konut projelerimiz hakkında detaylı bilgi, görseller ve teknik özellikler.",
        downloadText: "İndir (PDF, 12 MB)",
      },
      {
        title: "Ticari Yapılar Kataloğu",
        description: "Ofis, plaza ve endüstriyel yapı projelerimizin detayları.",
        downloadText: "İndir (PDF, 15 MB)",
      },
      {
        title: "Tadilat & Renovasyon",
        description: "Renovasyon projelerimizden öncesi ve sonrası görselleri.",
        downloadText: "İndir (PDF, 8 MB)",
      },
      {
        title: "Kurumsal Sunum",
        description: "Firma tanıtımı, referanslar ve kalite belgelerimiz.",
        downloadText: "İndir (PDF, 6 MB)",
      },
      {
        title: "Teknik Şartnameler",
        description: "İnşaat malzemeleri ve uygulama standartlarımız.",
        downloadText: "İndir (PDF, 10 MB)",
      },
      {
        title: "Fiyat Listesi 2025",
        description: "Güncel hizmet fiyatlarımız ve paket seçenekleri.",
        downloadText: "İndir (PDF, 2 MB)",
      },
    ],
  }

  const galleryImages = [
    "/construction-site-crane.jpg",
    "/building-interior-modern.jpg",
    "/construction-workers-team.png",
    "/modern-building-facade.jpg",
    "/luxury-home-interior.png",
    "/modern-office-space.png",
    "/building-plans-blueprints.jpg",
    "/skyscraper-construction.jpg",
  ]

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-balance">{content.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Catalogs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {content.catalogs.map((catalog, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-muted mb-6">
                  <FileText size={32} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{catalog.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {catalog.description}
                </p>
                <Button variant="outline" className="w-full font-normal bg-transparent">
                  <Download size={16} className="mr-2" />
                  {catalog.downloadText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-balance">{content.galleryTitle}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{content.gallerySubtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden">
                <img
                  src={image}
                  alt={`${locale === "en" ? "Gallery" : "Galeri"} ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
