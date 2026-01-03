"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

export default function BlogPage() {
  const { locale } = useLanguage()

  const blogPosts = locale === "en" ? [
    {
      id: 1,
      title: "2025 Construction Trends: Sustainable Building Materials",
      excerpt: "Sustainability is becoming increasingly important in the construction sector. Eco-friendly materials and construction techniques that stand out in 2025...",
      author: "Elif Yılmaz",
      date: "December 15, 2024",
      category: "Trends",
    },
    {
      id: 2,
      title: "What to Consider in Home Construction",
      excerpt: "What should you pay attention to when building your dream home? All the details you need to know from land selection to delivery...",
      author: "Mehmet Kaya",
      date: "December 10, 2024",
      category: "Guide",
    },
    {
      id: 3,
      title: "Smart Building Systems and Automation",
      excerpt: "The use of smart systems in modern buildings is increasing. Technologies that provide energy savings, security, and comfort...",
      author: "Ali Aslan",
      date: "December 5, 2024",
      category: "Technology",
    },
    {
      id: 4,
      title: "Budget Management in Construction Projects",
      excerpt: "Proper budgeting is crucial for a successful construction project. Recommendations on cost control and saving methods...",
      author: "Zeynep Demir",
      date: "December 1, 2024",
      category: "Finance",
    },
    {
      id: 5,
      title: "Earthquake-Resistant Building Design",
      excerpt: "Design and implementation principles considering earthquake reality in Turkey. Critical information for safe structures...",
      author: "Mehmet Kaya",
      date: "November 25, 2024",
      category: "Safety",
    },
    {
      id: 6,
      title: "Digital Transformation in the Construction Industry",
      excerpt: "How are innovations like BIM technology, digital twins, and artificial intelligence changing the construction sector? Future construction projects...",
      author: "Elif Yılmaz",
      date: "November 20, 2024",
      category: "Technology",
    },
  ] : [
    {
      id: 1,
      title: "2025 İnşaat Trendleri: Sürdürülebilir Yapı Malzemeleri",
      excerpt: "İnşaat sektöründe sürdürülebilirlik giderek daha önemli hale geliyor. 2025 yılında öne çıkan çevre dostu malzemeler ve yapım teknikleri...",
      author: "Elif Yılmaz",
      date: "15 Aralık 2024",
      category: "Trendler",
    },
    {
      id: 2,
      title: "Ev İnşaatında Dikkat Edilmesi Gerekenler",
      excerpt: "Hayalinizdeki evi inşa ederken nelere dikkat etmelisiniz? Arsa seçiminden teslim aşamasına kadar bilmeniz gereken tüm detaylar...",
      author: "Mehmet Kaya",
      date: "10 Aralık 2024",
      category: "Rehber",
    },
    {
      id: 3,
      title: "Akıllı Bina Sistemleri ve Otomasyon",
      excerpt: "Modern yapılarda akıllı sistemlerin kullanımı artıyor. Enerji tasarrufu, güvenlik ve konfor sağlayan teknolojiler...",
      author: "Ali Aslan",
      date: "5 Aralık 2024",
      category: "Teknoloji",
    },
    {
      id: 4,
      title: "İnşaat Projelerinde Bütçe Yönetimi",
      excerpt: "Başarılı bir inşaat projesi için doğru bütçeleme çok önemli. Maliyet kontrolü ve tasarruf yöntemleri hakkında öneriler...",
      author: "Zeynep Demir",
      date: "1 Aralık 2024",
      category: "Finans",
    },
    {
      id: 5,
      title: "Depreme Dayanıklı Yapı Tasarımı",
      excerpt: "Türkiye'de deprem gerçeği göz önünde bulundurularak yapılan tasarım ve uygulama prensipleri. Güvenli yapılar için kritik bilgiler...",
      author: "Mehmet Kaya",
      date: "25 Kasım 2024",
      category: "Güvenlik",
    },
    {
      id: 6,
      title: "İnşaat Sektöründe Dijital Dönüşüm",
      excerpt: "BIM teknolojisi, dijital ikiz ve yapay zeka gibi yenilikler inşaat sektörünü nasıl değiştiriyor? Geleceğin inşaat projeleri...",
      author: "Elif Yılmaz",
      date: "20 Kasım 2024",
      category: "Teknoloji",
    },
  ]

  const content = locale === "en" ? {
    title: "Blog",
    subtitle: "Latest news, trends, and expert opinions about the construction industry",
    readMore: "Read More",
  } : {
    title: "Blog",
    subtitle: "İnşaat sektörü hakkında güncel haberler, trendler ve uzman görüşleri",
    readMore: "Devamını Oku",
  }

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

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🏗️</div>
                        <div className="text-sm text-muted-foreground font-medium">{post.category}</div>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-balance">{post.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                      {content.readMore} <ArrowRight size={16} />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
