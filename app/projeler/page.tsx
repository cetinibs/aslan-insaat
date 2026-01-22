"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { Grid3X3, MapIcon, Building2, Filter } from "lucide-react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/lib/i18n"

// Leaflet'i dinamik olarak yükle (SSR sorunlarını önlemek için)
const ProjectMap = dynamic(() => import("@/components/project-map").then((mod) => mod.ProjectMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-3xl bg-muted flex items-center justify-center">
      <div className="text-center">
        <MapIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
})

export default function ProjectsPage() {
  const { locale } = useLanguage()
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "ongoing">("all")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "Konut" | "Ticari">("all")
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")

  const content = locale === "en" ? {
    portfolio: "Our Portfolio",
    title: "Our Projects",
    subtitle: "Explore our completed and ongoing projects with over 25 years of experience. Quality and reliability is our priority in every project.",
    totalProjects: "Total Projects",
    completed: "Completed",
    ongoing: "In Progress",
    filter: "Filter:",
    all: "All",
    completedFilter: "Completed",
    ongoingFilter: "In Progress",
    allCategories: "All Categories",
    residential: "Residential",
    commercial: "Commercial",
    noProjects: "No projects found",
    noProjectsDesc: "Try changing the filters.",
    ctaTitle: "Let's Bring Your Project to Life",
    ctaSubtitle: "Realize your dream project with us. Contact us now for a free site visit and quote.",
    getQuote: "Get Free Quote",
    contactUs: "Contact Us",
    grid: "Grid",
    map: "Map",
  } : {
    portfolio: "Portföyümüz",
    title: "Projelerimiz",
    subtitle: "25 yılı aşkın tecrübemizle tamamladığımız ve devam eden projelerimize göz atın. Her bir projede kalite ve güvenilirlik önceliğimiz.",
    totalProjects: "Toplam Proje",
    completed: "Tamamlanan",
    ongoing: "Devam Eden",
    filter: "Filtrele:",
    all: "Tümü",
    completedFilter: "Tamamlanan",
    ongoingFilter: "Devam Eden",
    allCategories: "Tüm Kategoriler",
    residential: "Konut",
    commercial: "Ticari",
    noProjects: "Proje bulunamadı",
    noProjectsDesc: "Filtreleri değiştirerek tekrar deneyin.",
    ctaTitle: "Projenizi Hayata Geçirelim",
    ctaSubtitle: "Siz de hayalinizdeki projeyi bizimle birlikte gerçekleştirin. Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin.",
    getQuote: "Ücretsiz Teklif Al",
    contactUs: "İletişime Geçin",
    grid: "Grid",
    map: "Harita",
  }

  const projects = [
    {
      id: 1,
      title: "ERSA ORMAN EVLERİ",
      category: "Konut",
      status: "completed" as const,
      year: "2018",
      description: locale === "en"
        ? "Sultanbeyli ERSA FOREST HOUSES - Modern residential project realized in partnership with Denkser & Suğra Construction"
        : "Sultanbeyli ERSA ORMAN EVLERİ - Denkser & Suğra İnşaat ortaklığı ile hayata geçirilen modern konut projesi",
      image: "/ersa.jpeg",
      location: "Sultanbeyli, İstanbul",
      progress: 100,
    },
    {
      id: 2,
      title: "FERHAT PAŞA İŞ MERKEZİ PROJESİ",
      category: "Ticari",
      status: "completed" as const,
      year: "2018",
      description: locale === "en"
        ? "Ferhat Pasha District Business Center Building - Ataşehir/Istanbul"
        : "Ferhat Paşa Mahallesi İş Merkezi Binası - Ataşehir/İstanbul",
      image: "/ferhatpasa-is-merkezi.jpeg",
      location: "Ataşehir, İstanbul",
      progress: 100,
    },
    {
      id: 3,
      title: "MUSTAFA KEMAL PROJESİ",
      category: "Konut",
      status: "completed" as const,
      year: "2018",
      description: locale === "en"
        ? "Mustafa Kemal District 3058 Street No:8/2 (8) Apartment - Ataşehir/Istanbul"
        : "Mustafa Kemal Mahallesi 3058 Sokak No:8/2 (8) Daire - Ataşehir/İstanbul",
      image: "/mustafa-kemal.jpeg",
      location: "Ataşehir, İstanbul",
      progress: 100,
    },
    {
      id: 4,
      title: "EYÜPCAN APARTMANI",
      category: "Konut",
      status: "completed" as const,
      year: "2014",
      description: locale === "en"
        ? "Eyüpcan Apartment - Esatpaşa Dist. Salih Omurtak Street No:79/4 - Ataşehir Istanbul"
        : "Eyüpcan Apartmanı - Esatpaşa Mah. Salih Omurtak Caddesi No:79/4 - Ataşehir İstanbul",
      image: "/eyupcan-apartmani.jpeg",
      location: "Ataşehir, İstanbul",
      progress: 100,
    },
    {
      id: 5,
      title: "KUMBAŞI PROJESİ",
      category: "Konut",
      status: "ongoing" as const,
      year: "2025",
      description: locale === "en"
        ? "Kumbaşı Project - ongoing modern residential project"
        : "Kumbaşı Projesi - devam eden modern konut projesi",
      image: "/modern-apartment-building.png",
      location: "İstanbul",
      progress: 35,
    },
    {
      id: 6,
      title: "19 MAYIS PROJESİ",
      category: "Konut",
      status: "ongoing" as const,
      year: "2025",
      description: locale === "en"
        ? "19 Mayıs Project - ongoing modern residential project"
        : "19 Mayıs Projesi - devam eden modern konut projesi",
      image: "/modern-residential-exterior.png",
      location: "İstanbul",
      progress: 45,
    },
    {
      id: 7,
      title: "Residence İstanbul",
      category: "Konut",
      status: "completed" as const,
      year: "2024",
      description: locale === "en"
        ? "120-unit luxury residential project designed with modern architecture"
        : "Modern mimari ile tasarlanmış 120 daireli lüks konut projesi",
      image: "/modern-residential-building-exterior-day.jpg",
      location: "İstanbul",
      progress: 100,
    },
    {
      id: 8,
      title: "Business Center",
      category: "Ticari",
      status: "ongoing" as const,
      year: "2025",
      description: locale === "en"
        ? "25-story modern business center and plaza"
        : "25 katlı modern iş merkezi ve plaza",
      image: "/modern-office-glass.png",
      location: "İstanbul",
      progress: 60,
    },
    {
      id: 9,
      title: "Villa Bodrum",
      category: "Konut",
      status: "completed" as const,
      year: "2023",
      description: locale === "en"
        ? "Luxury villa project with sea view"
        : "Deniz manzaralı lüks villa projesi",
      image: "/luxury-villa-with-pool-sunset.jpg",
      location: "Bodrum, Muğla",
      progress: 100,
    },
    {
      id: 10,
      title: "Shopping Mall Ankara",
      category: "Ticari",
      status: "completed" as const,
      year: "2023",
      description: locale === "en"
        ? "45,000 m² shopping center"
        : "45,000 m² alışveriş merkezi",
      image: "/modern-mall-interior.png",
      location: "Ankara",
      progress: 100,
    },
    {
      id: 11,
      title: "Residence Antalya",
      category: "Konut",
      status: "ongoing" as const,
      year: "2025",
      description: locale === "en"
        ? "Beachfront residence project"
        : "Sahil kenarı rezidans projesi",
      image: "/beachfront-apartment-building.jpg",
      location: "Antalya",
      progress: 25,
    },
    {
      id: 12,
      title: "Office Tower İzmir",
      category: "Ticari",
      status: "completed" as const,
      year: "2024",
      description: locale === "en"
        ? "30-story office tower"
        : "30 katlı ofis kulesi",
      image: "/tall-office-tower-architecture.jpg",
      location: "İzmir",
      progress: 100,
    },

    {
      id: 14,
      title: "ATAŞEHİR PROJESİ",
      category: "Konut",
      status: "ongoing" as const,
      year: "2025",
      description: locale === "en"
        ? "Ataşehir Project - Prestigious residential project offering modern architecture and luxury living spaces"
        : "Ataşehir Projesi - Modern mimari ve lüks yaşam alanları sunan prestijli konut projesi",
      image: "/projects/atasehir/atasehir-1.jpg",
      location: "Ataşehir, İstanbul",
      progress: 40,
    },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    return matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-amber-400 mb-6 backdrop-blur-sm">
              <Building2 size={18} />
              {content.portfolio}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              {content.title}
            </h1>
            <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
              {content.subtitle}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              <div>
                <div className="text-4xl font-bold text-amber-400">{projects.length}</div>
                <div className="text-white/60">{content.totalProjects}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-400">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-white/60">{content.completed}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400">
                  {projects.filter((p) => p.status === "ongoing").length}
                </div>
                <div className="text-white/60">{content.ongoing}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border sticky top-20 z-30 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 mr-4">
                <Filter size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">{content.filter}</span>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                  className="rounded-full"
                >
                  {content.all} ({projects.length})
                </Button>
                <Button
                  variant={statusFilter === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("completed")}
                  className="rounded-full"
                >
                  ✓ {content.completedFilter} ({projects.filter((p) => p.status === "completed").length})
                </Button>
                <Button
                  variant={statusFilter === "ongoing" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("ongoing")}
                  className="rounded-full"
                >
                  ⏳ {content.ongoingFilter} ({projects.filter((p) => p.status === "ongoing").length})
                </Button>
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 border-l pl-4 ml-2">
                <Button
                  variant={categoryFilter === "all" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCategoryFilter("all")}
                >
                  {content.allCategories}
                </Button>
                <Button
                  variant={categoryFilter === "Konut" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCategoryFilter("Konut")}
                >
                  🏠 {content.residential}
                </Button>
                <Button
                  variant={categoryFilter === "Ticari" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCategoryFilter("Ticari")}
                >
                  🏢 {content.commercial}
                </Button>
              </div>
            </div>

            {/* Right: View Mode Toggle */}
            <div className="flex gap-2 bg-muted p-1 rounded-xl">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "grid"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Grid3X3 size={18} />
                {content.grid}
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === "map"
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <MapIcon size={18} />
                {content.map}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{content.noProjects}</h3>
                  <p className="text-muted-foreground">{content.noProjectsDesc}</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      category={locale === "en"
                        ? (project.category === "Konut" ? "Residential" : "Commercial")
                        : project.category
                      }
                      status={project.status}
                      year={project.year}
                      description={project.description}
                      image={project.image}
                      location={project.location}
                      progress={project.progress}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-8">
              <ProjectMap />

              {/* Mini project list below map */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredProjects.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="p-4 rounded-2xl bg-card border hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.location}</p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${project.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {project.status === "completed"
                            ? (locale === "en" ? "Completed" : "Tamamlandı")
                            : `${project.progress}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.ctaTitle}</h2>
            <p className="text-muted-foreground mb-8">
              {content.ctaSubtitle}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/teklif"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                {content.getQuote}
              </a>
              <a
                href="/iletisim"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-muted border font-medium hover:bg-muted/80 transition-colors"
              >
                {content.contactUs}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
