"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building2, Users, CheckCircle2, ArrowLeft, Share2, Heart } from "lucide-react"
import Link from "next/link"
import { ProgressTimeline } from "@/components/progress-timeline"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n"

// Sample project details - in real app, this would come from a database
const projectDetails: Record<string, {
  title: string
  category: string
  status: "completed" | "ongoing"
  year: string
  location: string
  area: string
  units: string
  description: string
  features: string[]
  images: string[]
  progress?: number
  milestones?: Array<{
    id: string
    title: string
    description: string
    status: "completed" | "in-progress" | "pending"
    date?: string
  }>
}> = {
  "1": {
    title: "ERSA ORMAN EVLERİ",
    category: "Konut",
    status: "completed",
    year: "2018",
    location: "Sultanbeyli, İstanbul",
    area: "15,000 m²",
    units: "24 villa",
    description:
      "Sultanbeyli ERSA ORMAN EVLERİ - Denkser & Suğra İnşaat ortaklığı ile hayata geçirilen modern konut projesi. Doğayla iç içe, huzurlu bir yaşam alanı sunan bu proje, aile yaşamı için ideal ortamlar sunmaktadır.",
    features: [
      "Depreme dayanıklı betonarme yapı",
      "Özel bahçeli villalar",
      "Kapalı otopark",
      "7/24 güvenlik sistemi",
      "Çocuk parkı ve yeşil alanlar",
      "Merkezi ısıtma sistemi",
    ],
    images: [
      "/ersa.jpeg",
      "/modern-residential-exterior.png",
      "/luxury-apartment-interior.jpg",
    ],
    progress: 100,
    milestones: [
      { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed", date: "Ocak 2017" },
      { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel", status: "completed", date: "Mart 2017" },
      { id: "3", title: "Kaba İnşaat", description: "Betonarme işleri", status: "completed", date: "Ekim 2017" },
      { id: "4", title: "İnce İşler", description: "Sıva, boya, tesisat", status: "completed", date: "Haziran 2018" },
      { id: "5", title: "Teslim", description: "Anahtar teslim", status: "completed", date: "Eylül 2018" },
    ],
  },
  "5": {
    title: "KUMBAŞI PROJESİ",
    category: "Konut",
    status: "ongoing",
    year: "2025",
    location: "İstanbul",
    area: "8,500 m²",
    units: "36 daire",
    description:
      "Kumbaşı Projesi - Modern mimari anlayışla tasarlanan, şehir yaşamının konforunu sunan yeni nesil konut projesi. Akıllı ev sistemleri ve sürdürülebilir malzemelerle inşa edilmektedir.",
    features: [
      "Depreme dayanıklı yapı",
      "Akıllı ev sistemleri",
      "Güneş enerjisi panelleri",
      "Elektrikli araç şarj istasyonları",
      "Çatı bahçesi",
      "Fitness ve spa merkezi",
    ],
    images: [
      "/modern-apartment-building.png",
      "/modern-residential-exterior.png",
      "/modern-building-lobby.png",
    ],
    progress: 35,
    milestones: [
      { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed", date: "Eylül 2024" },
      { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel", status: "completed", date: "Kasım 2024" },
      { id: "3", title: "Kaba İnşaat", description: "Betonarme işleri", status: "in-progress", date: "Haziran 2025" },
      { id: "4", title: "İnce İşler", description: "Sıva, boya, tesisat", status: "pending", date: "Aralık 2025" },
      { id: "5", title: "Teslim", description: "Anahtar teslim", status: "pending", date: "Mart 2026" },
    ],
  },
  "8": {
    title: "Business Center",
    category: "Ticari",
    status: "ongoing",
    year: "2025",
    location: "İstanbul",
    area: "35,000 m²",
    units: "25 kat",
    description:
      "25 katlı modern iş merkezi ve plaza. A+ ofis standartlarında, son teknoloji altyapı ile donatılmış, İstanbul'un yeni iş merkezi olmaya aday prestijli proje.",
    features: [
      "A+ ofis standartları",
      "Fiber optik altyapı",
      "Merkezi klima sistemi",
      "Helipad",
      "Konferans merkezleri",
      "Yeraltı otoparkı (500 araç)",
    ],
    images: [
      "/modern-office-glass.png",
      "/tall-office-tower-architecture.jpg",
      "/modern-building-lobby.png",
    ],
    progress: 60,
    milestones: [
      { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed", date: "Ocak 2024" },
      { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel", status: "completed", date: "Nisan 2024" },
      { id: "3", title: "Kaba İnşaat", description: "Çelik konstrüksiyon", status: "in-progress", date: "Kasım 2024" },
      { id: "4", title: "Cephe ve İç Mekan", description: "Cam cephe ve iç tasarım", status: "pending", date: "Haziran 2025" },
      { id: "5", title: "Teslim", description: "Anahtar teslim", status: "pending", date: "Aralık 2025" },
    ],
  },
  "13": {
    title: "ÇAKMAK MAHALLESİ PROJESİ",
    category: "Konut",
    status: "ongoing",
    year: "2025",
    location: "Ümraniye, İstanbul",
    area: "5,200 m²",
    units: "24 daire",
    description:
      "Çakmak Mahallesi Projesi - Ümraniye'nin en prestijli lokasyonlarından birinde yükselen modern konut projemiz. Depreme dayanıklı betonarme yapısı, estetik dış cephe tasarımı ve konforlu yaşam alanları ile aileler için ideal bir yaşam sunmaktadır.",
    features: [
      "Depreme dayanıklı betonarme yapı",
      "Modern mimari tasarım",
      "Merkezi konum avantajı",
      "Geniş sosyal alanlar",
      "Kapalı otopark",
      "7/24 güvenlik sistemi",
    ],
    images: [
      "/projects/cakmak-mahallesi/cakmak-1.jpg",
      "/projects/cakmak-mahallesi/cakmak-2.jpg",
      "/projects/cakmak-mahallesi/cakmak-3.jpg",
      "/projects/cakmak-mahallesi/cakmak-4.jpg",
      "/projects/cakmak-mahallesi/cakmak-5.jpg",
    ],
    progress: 60,
    milestones: [
      { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed", date: "Eylül 2024" },
      { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel çalışmaları", status: "completed", date: "Kasım 2024" },
      { id: "3", title: "Kaba İnşaat", description: "Betonarme işleri ve dış cephe", status: "in-progress", date: "Haziran 2025" },
      { id: "4", title: "İnce İşler", description: "Sıva, boya, tesisat", status: "pending", date: "Aralık 2025" },
      { id: "5", title: "Teslim", description: "Anahtar teslim", status: "pending", date: "Mart 2026" },
    ],
  },
  "14": {
    title: "ATAŞEHİR PROJESİ",
    category: "Konut",
    status: "ongoing",
    year: "2025",
    location: "Ataşehir, İstanbul",
    area: "4,800 m²",
    units: "28 daire",
    description:
      "Ataşehir Projesi - İstanbul'un prestijli ilçelerinden Ataşehir'de yükselen modern konut projemiz. Ferforje balkonları, klasik ve modern mimariyi harmanlayan dış cephe tasarımı ile dikkat çeken proje, lüks yaşam alanları sunmaktadır.",
    features: [
      "Depreme dayanıklı betonarme yapı",
      "Modern ve klasik mimari tasarım",
      "Ferforje işlemeli balkonlar",
      "Merkezi konum avantajı",
      "Lüks iç tasarım",
      "Kapalı otopark ve güvenlik",
    ],
    images: [
      "/projects/atasehir/atasehir-1.jpg",
      "/projects/atasehir/atasehir-2.jpg",
    ],
    progress: 40,
    milestones: [
      { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed", date: "Ekim 2024" },
      { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel çalışmaları", status: "completed", date: "Aralık 2024" },
      { id: "3", title: "Kaba İnşaat", description: "Betonarme işleri ve dış cephe", status: "in-progress", date: "Ağustos 2025" },
      { id: "4", title: "İnce İşler", description: "Sıva, boya, tesisat", status: "pending", date: "Şubat 2026" },
      { id: "5", title: "Teslim", description: "Anahtar teslim", status: "pending", date: "Haziran 2026" },
    ],
  },
}

// Default project for unknown IDs
const defaultProject = {
  title: "Residence İstanbul",
  category: "Konut",
  status: "completed" as const,
  year: "2024",
  location: "Maslak, İstanbul",
  area: "45,000 m²",
  units: "120 daire",
  description:
    "Modern mimari anlayışla tasarlanmış, şehrin kalbinde yer alan lüks konut projesi. Yüksek kaliteli malzemeler ve detaylara gösterilen özen ile hayata geçirilen Residence İstanbul, sakinlerine konforlu bir yaşam alanı sunuyor.",
  features: [
    "Depreme dayanıklı çelik konstrüksiyon",
    "Akıllı ev sistemleri",
    "Kapalı otopark ve 7/24 güvenlik",
    "Sosyal tesis alanları",
    "Peyzaj bahçesi ve yürüyüş parkurları",
    "Fitness merkezi ve kapalı yüzme havuzu",
  ],
  images: [
    "/modern-residential-exterior.png",
    "/luxury-apartment-interior.jpg",
    "/modern-building-lobby.png",
    "/apartment-balcony-city-view.jpg",
  ],
  progress: 100,
  milestones: [
    { id: "1", title: "Proje Başlangıcı", description: "Sözleşme ve planlama", status: "completed" as const, date: "Ocak 2023" },
    { id: "2", title: "Temel Atma", description: "Zemin etüdü ve temel", status: "completed" as const, date: "Mart 2023" },
    { id: "3", title: "Kaba İnşaat", description: "Betonarme işleri", status: "completed" as const, date: "Ekim 2023" },
    { id: "4", title: "İnce İşler", description: "Sıva, boya, tesisat", status: "completed" as const, date: "Haziran 2024" },
    { id: "5", title: "Teslim", description: "Anahtar teslim", status: "completed" as const, date: "Eylül 2024" },
  ],
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { locale } = useLanguage()
  const project = projectDetails[params.id] || defaultProject
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const content = locale === "en" ? {
    backToProjects: "Back to Projects",
    completed: "Completed",
    ongoing: "In Progress",
    aboutProject: "About the Project",
    features: "Features",
    projectProgress: "Project Progress",
    projectInfo: "Project Information",
    category: "Category",
    status: "Status",
    year: "Year",
    location: "Location",
    area: "Area",
    units: "Units",
    progress: "Progress",
    getQuote: "Get Quote for Similar Project",
    contactUs: "Contact Us",
  } : {
    backToProjects: "Projelere Dön",
    completed: "Tamamlandı",
    ongoing: "Devam Ediyor",
    aboutProject: "Proje Hakkında",
    features: "Özellikler",
    projectProgress: "Proje İlerlemesi",
    projectInfo: "Proje Bilgileri",
    category: "Kategori",
    status: "Durum",
    year: "Yıl",
    location: "Konum",
    area: "Alan",
    units: "Birim",
    progress: "İlerleme",
    getQuote: "Benzer Proje İçin Teklif Alın",
    contactUs: "İletişime Geçin",
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              {content.backToProjects}
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full ${isLiked ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/70'} hover:bg-white/20 transition-all`}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
              </button>
              <button className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-all">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="max-w-5xl">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${project.status === "completed"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-amber-500/20 text-amber-400"
              }`}>
              {project.status === "completed" ? `✓ ${content.completed}` : `⏳ ${content.ongoing}`}
              {project.status === "ongoing" && project.progress && ` - ${project.progress}%`}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-amber-400" />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-amber-400" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-amber-400" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-amber-400" />
                <span>{project.units}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Gallery */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3 aspect-[16/9] overflow-hidden rounded-2xl">
              <img
                src={project.images[selectedImage] || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 lg:w-full aspect-[4/3] overflow-hidden rounded-xl transition-all ${selectedImage === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold mb-4">{content.aboutProject}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold mb-6">{content.features}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <CheckCircle2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Timeline (for ongoing projects or to show completion) */}
              {project.milestones && (
                <div>
                  <h3 className="text-2xl font-bold mb-6">{content.projectProgress}</h3>
                  <ProgressTimeline
                    milestones={project.milestones}
                    currentProgress={project.progress || 100}
                  />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 sticky top-24 border-2">
                <h3 className="text-xl font-bold mb-6">{content.projectInfo}</h3>
                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.category}</span>
                    <span className="font-semibold">{project.category}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.status}</span>
                    <span className={`font-semibold ${project.status === "completed" ? "text-emerald-500" : "text-amber-500"
                      }`}>
                      {project.status === "completed" ? content.completed : content.ongoing}
                    </span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.year}</span>
                    <span className="font-semibold">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.location}</span>
                    <span className="font-semibold">{project.location}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.area}</span>
                    <span className="font-semibold">{project.area}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-border">
                    <span className="text-muted-foreground">{content.units}</span>
                    <span className="font-semibold">{project.units}</span>
                  </div>
                  {project.progress && project.status === "ongoing" && (
                    <div className="py-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">{content.progress}</span>
                        <span className="font-bold text-amber-500">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link href="/teklif" className="block">
                    <Button className="w-full gradient-primary">
                      {content.getQuote}
                    </Button>
                  </Link>
                  <Link href="/iletisim" className="block">
                    <Button variant="outline" className="w-full">
                      {content.contactUs}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
