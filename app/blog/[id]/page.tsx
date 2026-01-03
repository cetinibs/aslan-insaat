"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

const blogPosts = [
  {
    id: 1,
    title: "2025 İnşaat Trendleri: Sürdürülebilir Yapı Malzemeleri",
    excerpt:
      "İnşaat sektöründe sürdürülebilirlik giderek daha önemli hale geliyor. 2025 yılında öne çıkan çevre dostu malzemeler ve yapım teknikleri...",
    author: "Elif Yılmaz",
    date: "15 Aralık 2024",
    image: "/sustainable-construction-materials.jpg",
    category: "Trendler",
    content: `
      <h2>Sürdürülebilir İnşaatın Önemi</h2>
      <p>İnşaat sektörü küresel karbon emisyonlarının önemli bir kaynağıdır. Bu nedenle sürdürülebilir yapı malzemeleri kullanımı giderek daha önemli hale gelmektedir. 2025 yılında öne çıkan çevre dostu malzemeler şunlardır:</p>
      
      <h3>1. Geri Dönüştürülmüş Malzemeler</h3>
      <p>Geri dönüştürülmüş çelik, alüminyum ve plastik malzemeler, doğal kaynak tüketimini azaltırken dayanıklılığı korur. Bu malzemeler inşaat projelerinde hem ekonomik hem de çevresel avantajlar sunar.</p>
      
      <h3>2. Enerji Verimli Yalıtım Sistemleri</h3>
      <p>Modern binalarda enerji tasarrufu sağlamak için gelişmiş yalıtım sistemleri kullanılmaktadır. Bu sistemler ısı köprülerini minimize ederek klima ve ısıtma maliyetlerini düşürür.</p>
      
      <h3>3. Doğal Yalıtım Malzemeleri</h3>
      <p>Saman, mantar ve yün gibi doğal yalıtım malzemeleri, kimyasal içermez ve biyolojik olarak parçalanabilir özelliklere sahiptir.</p>
      
      <h2>Gelecek Beklentileri</h2>
      <p>2025 ve sonrası için sürdürülebilir inşaat teknolojileri gelişmeye devam edecek. Yeşil bina sertifikaları ve enerji verimliliği standartları daha da sıkılaştırılacak.</p>
    `
  },
  {
    id: 2,
    title: "Ev İnşaatında Dikkat Edilmesi Gerekenler",
    excerpt:
      "Hayalinizdeki evi inşa ederken nelere dikkat etmelisiniz? Arsa seçiminden teslim aşamasına kadar bilmeniz gereken tüm detaylar...",
    author: "Mehmet Kaya",
    date: "10 Aralık 2024",
    image: "/modern-house-construction-site.jpg",
    category: "Rehber",
    content: `
      <h2>Arsa Seçimi</h2>
      <p>Ev inşaatında ilk ve en önemli adım doğru arsa seçimidir. Dikkat etmeniz gerekenler:</p>
      <ul>
        <li>İmar durumu ve yapılaşma koşulları</li>
        <li>Altyapı hizmetlerinin (elektrik, su, doğalgaz) mevcudiyeti</li>
        <li>Toplu taşıma ve erişim kolaylığı</li>
        <li>Çevresel faktörler ve komşuluk ilişkileri</li>
      </ul>
      
      <h2>Proje Tasarımı</h2>
      <p>Profesyonel bir mimar ile çalışarak ihtiyaçlarınıza uygun bir proje hazırlatın. Özellikle dikkat edilmesi gereken noktalar:</p>
      <ul>
        <li>Ayırma planı ve fonksiyonel dağılım</li>
        <li>Işıklandırma ve havalandırma</li>
        <li>Enerji verimliliği prensipleri</li>
        <li>Deprem güvenliği</li>
      </ul>
      
      <h2>Yapı Malzemesi Seçimi</h2>
      <p>Kaliteli ve sertifikalı malzemeler kullanın. Uzun vadede tasarruf sağlayacak malzemeler tercih edin.</p>
      
      <h2>İnşaat Süreci</h2>
      <p>Şantiye yönetimi, iş programı ve kalite kontrolleri titizlikle takip edilmelidir.</p>
    `
  },
  {
    id: 3,
    title: "Akıllı Bina Sistemleri ve Otomasyon",
    excerpt:
      "Modern yapılarda akıllı sistemlerin kullanımı artıyor. Enerji tasarrufu, güvenlik ve konfor sağlayan teknolojiler...",
    author: "Ali Aslan",
    date: "5 Aralık 2024",
    image: "/smart-building-technology.png",
    category: "Teknoloji",
    content: `
      <h2>Akıllı Bina Nedir?</h2>
      <p>Akıllı binalar, IoT teknolojileri ile donatılmış, otomasyon sistemleri ile kontrol edilebilen modern yapılardır. Bu sistemler sayesinde bina yönetimi ve kullanıcı deneyimi optimize edilir.</p>
      
      <h2>Temel Akıllı Sistemler</h2>
      
      <h3>1. Aydınlatma Otomasyonu</h3>
      <p>Sensör tabanlı aydınlatma sistemleri, ortamdaki ışık seviyesine göre otomatik olarak ayarlanır. Bu sayede enerji tasarrufu sağlanır ve kullanıcı konforu artar.</p>
      
      <h3>2. İklimlendirme Kontrolü</h3>
      <p>Akıllı termostat sistemleri, kullanıcı tercihlerini öğrenerek sıcaklığı otomatik olarak ayarlar. Mobil uygulamalar üzerinden uzaktan kontrol mümkündür.</p>
      
      <h3>3. Güvenlik Sistemleri</h3>
      <p>Akıllı kamera, kilit ve alarm sistemleri ile bina güvenliği artırılır. Bildirimler anlık olarak mobil cihazlara gönderilir.</p>
      
      <h3>4. Enerji Yönetimi</h3>
      <p>Gerçek zamanlı enerji takibi ve tüketim analizi sayesinde enerji israfı önlenir. Solar paneller ve batarya sistemleri ile entegrasyon mümkündür.</p>
      
      <h2>Maliyet ve Yatırım Getirisi</h2>
      <p>Akıllı sistemlerin kurulum maliyeti artsa da, uzun vadede enerji tasarrufu ve artan konfor ile kendini amorti eder.</p>
    `
  },
  {
    id: 4,
    title: "İnşaat Projelerinde Bütçe Yönetimi",
    excerpt:
      "Başarılı bir inşaat projesi için doğru bütçeleme çok önemli. Maliyet kontrolü ve tasarruf yöntemleri hakkında öneriler...",
    author: "Zeynep Demir",
    date: "1 Aralık 2024",
    image: "/construction-budget-planning.jpg",
    category: "Finans",
    content: `
      <h2>Proje Bütçelemesi</h2>
      <p>Doğru bir bütçe planlaması, inşaat projelerinin başarısı için kritik öneme sahiptir. Bütçe oluşturma aşamasında şu faktörler dikkate alınmalıdır:</p>
      
      <h3>1. Arsa Maliyeti</h3>
      <p>Arsa satın alma, tapu harçları ve noter masrafları bütçenin önemli bir kısmını oluşturur.</p>
      
      <h3>2. Proje ve Ruhsat Masrafları</h3>
      <p>Mimar, mühendis ve proje danışmanlık ücretleri, belediye harçları ve ruhsat masrafları hesaplanmalıdır.</p>
      
      <h3>3. İnşaat Maliyetleri</h3>
      <p>Malzeme, işçilik, ekipman ve şantiye giderleri detaylı bir şekilde hesaplanmalıdır. En az %15-20 ek bütçe ayırmanız önerilir.</p>
      
      <h3>4. Finansman Maliyetleri</h3>
      <p>Kredi faizleri ve finansman maliyetleri bütçeye dahil edilmelidir.</p>
      
      <h2>Maliyet Kontrol Yöntemleri</h2>
      <ul>
        <li>Düzenli nakit akışı takibi</li>
        <li>Malzeme fiyatları anlık olarak izlenmeli</li>
        <li>Alt yüklenicilerle şeffaf sözleşmeler</li>
        <li>Değişiklik yönetimi süreçleri</li>
      </ul>
      
      <h2>Tasarruf Stratejileri</h2>
      <p>Toplu alım indirimleri, sezon dışı alımlar ve enerji verimli malzemeler kullanılarak maliyetler düşürülebilir.</p>
    `
  },
  {
    id: 5,
    title: "Depreme Dayanıklı Yapı Tasarımı",
    excerpt:
      "Türkiye'de deprem gerçeği göz önünde bulundurularak yapılan tasarım ve uygulama prensipleri. Güvenli yapılar için kritik bilgiler...",
    author: "Mehmet Kaya",
    date: "25 Kasım 2024",
    image: "/earthquake-resistant-building.jpg",
    category: "Güvenlik",
    content: `
      <h2>Türkiye'de Deprem Bilinci</h2>
      <p>Türkiye deprem kuşağında yer alan bir ülkedir. Bu nedenle yapıların depreme dayanıklı olması hayati önem taşır. 1999 depremlerinden sonra alınan tedbirler daha da önem kazanmıştır.</p>
      
      <h2>Deprem Yönetmeliği</h2>
      <p>Türkiye Bina Deprem Yönetmeliği (TBDY), yapıların deprem yüklerine dayanıklı olmasını sağlayan temel standarttır. Yönetmeliğe uygun tasarım şarttır.</p>
      
      <h3>Temel Prencipler</h3>
      
      <h3>1. Düzenlilik ve Simetri</h3>
      <p>Düzenli ve simetrik yapı geometrisi, deprem yüklerinin dengeli dağılımını sağlar. Konsol yapısal elementlerden kaçınılmalıdır.</p>
      
      <h3>2. Yükseklik Oranları</h3>
      <p>Yapı yüksekliği ile taban boyutlarının oranı sınırlı olmalıdır. Yüksek binalarda özel hesaplamalar gereklidir.</p>
      
      <h3>3. Betonarme Donatı Detayları</h3>
      <p>Uygun çap ve aralıklarda donatı kullanımı, düzgün köşebent detayları ve sargı donatısı kritik öneme sahiptir.</p>
      
      <h3>4. Temel Tasarımı</h3>
      <p>Zemin etütleri yapılmalı ve zemine uygun temel sistemi seçilmelidir. Radye temel veya kazıklı temel sistemleri sıklıkla kullanılır.</p>
      
      <h2>Kalite Kontrolü</h2>
      <p>Beton kalitesi, çelik donatı sertifikası ve işçilik kalitesi düzenli olarak kontrol edilmelidir. Denetim firmaları tarafından yapılan kontroller zorunludur.</p>
    `
  },
  {
    id: 6,
    title: "İnşaat Sektöründe Dijital Dönüşüm",
    excerpt:
      "BIM teknolojisi, dijital ikiz ve yapay zeka gibi yenilikler inşaat sektörünü nasıl değiştiriyor? Geleceğin inşaat projeleri...",
    author: "Elif Yılmaz",
    date: "20 Kasım 2024",
    image: "/digital-construction-technology.png",
    category: "Teknoloji",
    content: `
      <h2>Dijital Dönüşüm Nedir?</h2>
      <p>İnşaat sektöründe dijital dönüşüm, geleneksel yöntemlerin dijital teknolojilerle desteklenmesi ve optimize edilmesi sürecidir. Bu dönüşüm verimliliği artırır ve hataları azaltır.</p>
      
      <h2>BIM (Bilgi Modelleme) Teknolojisi</h2>
      <p>Building Information Modeling (BIM), bina projelerinin 3D model olarak oluşturulması ve yönetilmesi teknolojisidir.</p>
      
      <h3>BIM Avantajları</h3>
      <ul>
        <li>Tasarım hatalarının erken tespiti</li>
        <li>Maliyet tahminlerinin doğruluğu</li>
        <li>Proje süreçlerinin koordinasyonu</li>
        <li>Bakım ve işletme kolaylığı</li>
      </ul>
      
      <h2>Dijital İkiz Teknolojisi</h2>
      <p>Fiziksel binaların dijital kopyalarının oluşturulmasıdır. Bu sayede gerçek zamanlı izleme ve analiz mümkündür.</p>
      
      <h2>Yapay Zeka Uygulamaları</h2>
      <p>Yapay zeka, inşaat projelerinde şunlara olanak sağlar:</p>
      <ul>
        <li>Tasarım optimizasyonu</li>
        <li>Maliyet tahminleri</li>
        <li>Risk analizi</li>
        <li>Otomatik malzeme siparişi</li>
      </ul>
      <img src="/ai-in-construction.jpg" alt="Yapay zeka" />
      
      <h2>Gelecek Beklentileri</h2>
      <p>2025 ve sonrası için robotik inşaat, 3D baskı ve artırılmış gerçeklik teknolojileri daha yaygınlaşacak.</p>
    `
  }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const { locale } = useLanguage()
  const post = blogPosts.find((p) => p.id === parseInt(params.id))

  const content = locale === "en" ? {
    backToBlog: "Back to Blog",
  } : {
    backToBlog: "Blog'a Dön",
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-32 pb-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{locale === "en" ? "Post Not Found" : "Yazı Bulunamadı"}</h1>
            <p className="text-muted-foreground mb-8">{locale === "en" ? "The blog post you're looking for doesn't exist." : "Aradığınız blog yazısı mevcut değil."}</p>
            <Link href="/blog" className="text-primary hover:underline">
              {content.backToBlog}
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl mb-4">🏗️</div>
            <div className="text-2xl text-white/80 font-medium">{post.category}</div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            {content.backToBlog}
          </Link>
          <div className="bg-primary text-primary-foreground inline-block px-3 py-1 text-xs font-medium mb-4">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4 text-balance">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="space-y-6"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
