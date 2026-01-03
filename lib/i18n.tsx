"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Locale = "tr" | "en"

interface LanguageContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Comprehensive translations for the entire website
export const translations: Record<Locale, Record<string, string>> = {
    tr: {
        // Navigation
        "nav.home": "Anasayfa",
        "nav.about": "Hakkımızda",
        "nav.services": "Hizmetlerimiz",
        "nav.projects": "Projelerimiz",
        "nav.faq": "SSS",
        "nav.blog": "Blog",
        "nav.contact": "İletişim",
        "nav.getQuote": "Teklif Al",

        // Hero Section
        "hero.buildingDreams": "Hayallerinizi İnşa Ediyoruz",
        "hero.subtitle": "25 yıllık deneyimimizle güvenilir, kaliteli ve zamanında teslimat garantisi sunuyoruz.",
        "hero.exploreProjects": "Projelerimizi Keşfedin",
        "hero.getQuote": "Teklif Alın",

        // Stats
        "stats.yearsExperience": "Yıllık Deneyim",
        "stats.projectsCompleted": "Tamamlanan Proje",
        "stats.happyClients": "Mutlu Müşteri",
        "stats.satisfaction": "Memnuniyet",

        // Services
        "services.title": "Hizmetlerimiz",
        "services.subtitle": "Kapsamlı İnşaat Çözümleri",
        "services.description": "Her türlü inşaat ihtiyacınız için profesyonel ve güvenilir hizmet",
        "services.residential": "Konut Projeleri",
        "services.residentialDesc": "Modern ve güvenli konut projelerini anahtar teslim olarak hayata geçiriyoruz. Villa, apartman ve rezidans inşaatı.",
        "services.commercial": "Ticari Binalar",
        "services.commercialDesc": "Ofis binaları, alışveriş merkezleri ve endüstriyel yapılar için fonksiyonel ve modern tasarımlar sunuyoruz.",
        "services.renovation": "Tadilat & Renovasyon",
        "services.renovationDesc": "Mevcut yapılarınızı yenileme ve modernize etme hizmetleri. Detaylı planlama ve profesyonel uygulama.",
        "services.consulting": "Proje Danışmanlığı",
        "services.consultingDesc": "İnşaat projeleriniz için profesyonel danışmanlık. Planlama, bütçeleme ve proje yönetimi desteği.",
        "services.moreInfo": "Detaylı Bilgi",

        // Why Choose Us
        "why.title": "Neden Aslan İnşaat?",
        "why.subtitle": "Sektörde fark yaratan özelliklerimiz",
        "why.fast": "Hızlı & Verimli",
        "why.fastDesc": "Projelerinizi zamanında, hatta erken teslim etme taahhüdümüz",
        "why.quality": "Güvenli & Kaliteli",
        "why.qualityDesc": "Yüksek kalite standartları ve 2 yıl yapısal garanti",
        "why.support": "7/24 Destek",
        "why.supportDesc": "Proje süresince ve sonrasında kesintisiz teknik destek",

        // Projects
        "projects.title": "Projelerimiz",
        "projects.subtitle": "Gerçekleştirdiğimiz Projeler",
        "projects.description": "Tamamladığımız ve devam eden başarı hikayelerimiz",
        "projects.viewAll": "Tüm Projeleri Görüntüle",
        "projects.completed": "Tamamlandı",
        "projects.ongoing": "Devam Ediyor",
        "projects.residential": "Konut Projesi",
        "projects.commercial": "Ticari Proje",
        "projects.businessCenter": "İş Merkezi",
        "projects.gridView": "Grid",
        "projects.mapView": "Harita",
        "projects.allCategories": "Tümü",
        "projects.filterBy": "Filtrele",

        // Testimonials
        "testimonials.title": "Müşterilerimizin Görüşleri",
        "testimonials.subtitle": "Tamamladığımız projelerdeki müşteri memnuniyeti",

        // FAQ
        "faq.title": "Sık Sorulan Sorular",
        "faq.subtitle": "Merak edilen konularda detaylı yanıtlar",
        "faq.searchPlaceholder": "Soru ara...",
        "faq.allCategories": "Tümü",
        "faq.general": "Genel",
        "faq.pricing": "Fiyatlandırma",
        "faq.process": "Süreç",
        "faq.warranty": "Garanti",

        // FAQ Questions
        "faq.q1": "Proje teslim süresi ne kadar?",
        "faq.a1": "Proje süreleri, yapının büyüklüğü ve kompleksliğine göre değişmektedir. Konut projeleri ortalama 12-18 ay, ticari binalar 18-24 ay arası sürmektedir. İlk görüşmede size detaylı bir zaman çizelgesi sunuyoruz.",
        "faq.q2": "Ödeme planları nasıl oluyor?",
        "faq.a2": "Esnek ödeme planları sunuyoruz. Genellikle proje aşamalarına göre taksitli ödeme sistemi uyguluyoruz. Detaylı fiyatlandırma ve ödeme koşulları için teklif aşamasında size özel plan hazırlıyoruz.",
        "faq.q3": "Hangi bölgelerde hizmet veriyorsunuz?",
        "faq.a3": "Türkiye genelinde projeler gerçekleştiriyoruz. Özellikle İstanbul, Ankara, İzmir, Antalya ve Bodrum bölgelerinde aktif olarak çalışıyoruz. Diğer bölgeler için de görüşme yapabiliriz.",
        "faq.q4": "Garanti ve sonrası destek sağlıyor musunuz?",
        "faq.a4": "Evet, tüm projelerimizde 2 yıl yapısal garanti veriyoruz. Teslim sonrası oluşabilecek herhangi bir sorun için 7/24 destek hattımız mevcuttur. Müşteri memnuniyeti bizim için önceliktir.",
        "faq.q5": "Proje sırasında değişiklik yapılabilir mi?",
        "faq.a5": "Proje ilerleyişine göre makul değişiklikler yapılabilir. Ancak büyük değişiklikler maliyet ve süre açısından etkileyebilir. Değişiklik taleplerini proje yöneticimiz ile değerlendiriyor ve size en iyi çözümü sunuyoruz.",

        // CTA
        "cta.title": "Projenizi Hayata Geçirelim",
        "cta.subtitle": "Hayalinizdeki yapıyı birlikte planlayalım. Ücretsiz keşif ve danışmanlık için bizimle iletişime geçin.",
        "cta.contact": "İletişime Geçin",
        "cta.catalog": "Kataloğumuzu İnceleyin",

        // About Page
        "about.title": "Hakkımızda",
        "about.subtitle": "1999 yılından bu yana inşaat sektöründe güvenilir ve kaliteli hizmet anlayışıyla projeler gerçekleştiriyoruz.",
        "about.storyTitle": "25 yıllık deneyim ve güven",
        "about.storyP1": "Aslan İnşaat olarak 1999 yılında kurulduğumuz günden bu yana, Türkiye'nin önde gelen inşaat firmalarından biri olma yolunda emin adımlarla ilerliyoruz.",
        "about.storyP2": "Konut projelerinden ticari binalara, tadilat işlerinden proje danışmanlığına kadar geniş bir yelpazede hizmet sunuyoruz. Her projede müşteri memnuniyetini en üst düzeyde tutmayı ve kaliteden ödün vermemeyi ilke edindik.",
        "about.storyP3": "Uzman kadromuz, modern teknoloji ve yılların getirdiği deneyim ile projelerinizi zamanında ve bütçe dahilinde teslim ediyoruz. Güvenilir iş ortaklarımız ve titiz çalışma prensiplerimiz ile sektörde fark yaratıyoruz.",
        "about.valuesTitle": "Değerlerimiz",
        "about.valuesSubtitle": "İş yapış şeklimizi belirleyen temel prensiplerimiz",
        "about.quality": "Kalite",
        "about.qualityDesc": "Her projede en yüksek kalite standartlarını uyguluyoruz",
        "about.reliability": "Güvenilirlik",
        "about.reliabilityDesc": "Sözümüzün arkasında durarak güven inşa ediyoruz",
        "about.collaboration": "İşbirliği",
        "about.collaborationDesc": "Müşterilerimiz ve iş ortaklarımızla güçlü bağlar kuruyoruz",
        "about.goalOriented": "Hedef Odaklılık",
        "about.goalOrientedDesc": "Belirlenen hedeflere zamanında ve eksiksiz ulaşıyoruz",
        "about.certificatesTitle": "Sertifikalar & Ödüller",
        "about.certificatesSubtitle": "Kalite ve başarımızın tescilli belgeleri",

        // Services Page
        "servicesPage.title": "Hizmetlerimiz",
        "servicesPage.subtitle": "İnşaat sektöründe kapsamlı çözümler sunuyoruz. Her projeyi özenle planlıyor ve profesyonelce hayata geçiriyoruz.",

        // Contact Page
        "contact.title": "İletişim",
        "contact.subtitle": "Projeleriniz için bizimle iletişime geçin",
        "contact.address": "Adres",
        "contact.phone": "Telefon",
        "contact.email": "E-posta",
        "contact.hours": "Çalışma Saatleri",
        "contact.weekdays": "Pazartesi - Cuma: 09:00 - 18:00",
        "contact.saturday": "Cumartesi: 10:00 - 14:00",
        "contact.sendMessage": "Mesaj Gönderin",
        "contact.name": "Adınız",
        "contact.subject": "Konu",
        "contact.message": "Mesajınız",
        "contact.send": "Gönder",

        // Quote Page
        "quote.title": "Teklif Al",
        "quote.subtitle": "Projeniz için size özel teklif hazırlayalım",
        "quote.step1": "Proje Bilgileri",
        "quote.step2": "İletişim Bilgileri",
        "quote.step3": "Teklif Özeti",
        "quote.projectType": "Proje Türü",
        "quote.projectSize": "Proje Büyüklüğü",
        "quote.budget": "Bütçe",
        "quote.timeline": "Zaman Çizelgesi",
        "quote.description": "Proje Açıklaması",
        "quote.next": "İleri",
        "quote.back": "Geri",
        "quote.submit": "Teklif İste",

        // Blog
        "blog.title": "Blog",
        "blog.subtitle": "İnşaat sektöründeki güncel gelişmeler, ipuçları ve projelerimiz hakkında yazılar",
        "blog.readMore": "Devamını Oku",
        "blog.latestPosts": "Son Yazılar",

        // Footer
        "footer.description": "25 yıllık deneyimimizle, hayallerinizi güvenilir ve kaliteli inşaat çözümleriyle gerçeğe dönüştürüyoruz.",
        "footer.quickLinks": "Hızlı Bağlantılar",
        "footer.services": "Hizmetler",
        "footer.contact": "İletişim",
        "footer.rights": "Tüm hakları saklıdır.",
        "footer.privacy": "Gizlilik Politikası",
        "footer.terms": "Kullanım Koşulları",

        // Common
        "common.loading": "Yükleniyor...",
        "common.error": "Bir hata oluştu",
        "common.success": "Başarılı",
        "common.close": "Kapat",
        "common.save": "Kaydet",
        "common.cancel": "İptal",
        "common.confirm": "Onayla",
        "common.search": "Ara",
        "common.viewDetails": "Detayları Görüntüle",
    },
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "About Us",
        "nav.services": "Our Services",
        "nav.projects": "Our Projects",
        "nav.faq": "FAQ",
        "nav.blog": "Blog",
        "nav.contact": "Contact",
        "nav.getQuote": "Get Quote",

        // Hero Section
        "hero.buildingDreams": "Building Your Dreams",
        "hero.subtitle": "With 25 years of experience, we offer reliable, quality construction with on-time delivery guarantee.",
        "hero.exploreProjects": "Explore Our Projects",
        "hero.getQuote": "Get a Quote",

        // Stats
        "stats.yearsExperience": "Years Experience",
        "stats.projectsCompleted": "Projects Completed",
        "stats.happyClients": "Happy Clients",
        "stats.satisfaction": "Satisfaction",

        // Services
        "services.title": "Our Services",
        "services.subtitle": "Comprehensive Construction Solutions",
        "services.description": "Professional and reliable service for all your construction needs",
        "services.residential": "Residential Projects",
        "services.residentialDesc": "We build modern and safe residential projects turnkey. Villas, apartments, and residences.",
        "services.commercial": "Commercial Buildings",
        "services.commercialDesc": "We offer functional and modern designs for office buildings, shopping centers, and industrial structures.",
        "services.renovation": "Renovation & Remodeling",
        "services.renovationDesc": "Services for renovating and modernizing existing structures. Detailed planning and professional execution.",
        "services.consulting": "Project Consulting",
        "services.consultingDesc": "Professional consulting for your construction projects. Planning, budgeting, and project management support.",
        "services.moreInfo": "Learn More",

        // Why Choose Us
        "why.title": "Why Aslan Construction?",
        "why.subtitle": "Features that make a difference in the industry",
        "why.fast": "Fast & Efficient",
        "why.fastDesc": "Our commitment to deliver your projects on time, or even early",
        "why.quality": "Safe & Quality",
        "why.qualityDesc": "High quality standards with 2-year structural warranty",
        "why.support": "24/7 Support",
        "why.supportDesc": "Continuous technical support during and after the project",

        // Projects
        "projects.title": "Our Projects",
        "projects.subtitle": "Projects We've Completed",
        "projects.description": "Our completed and ongoing success stories",
        "projects.viewAll": "View All Projects",
        "projects.completed": "Completed",
        "projects.ongoing": "In Progress",
        "projects.residential": "Residential Project",
        "projects.commercial": "Commercial Project",
        "projects.businessCenter": "Business Center",
        "projects.gridView": "Grid",
        "projects.mapView": "Map",
        "projects.allCategories": "All",
        "projects.filterBy": "Filter",

        // Testimonials
        "testimonials.title": "Client Testimonials",
        "testimonials.subtitle": "Customer satisfaction from our completed projects",

        // FAQ
        "faq.title": "Frequently Asked Questions",
        "faq.subtitle": "Detailed answers to commonly asked questions",
        "faq.searchPlaceholder": "Search questions...",
        "faq.allCategories": "All",
        "faq.general": "General",
        "faq.pricing": "Pricing",
        "faq.process": "Process",
        "faq.warranty": "Warranty",

        // FAQ Questions
        "faq.q1": "What is the project delivery time?",
        "faq.a1": "Project timelines vary based on the size and complexity of the structure. Residential projects average 12-18 months, commercial buildings 18-24 months. We provide a detailed timeline at the initial meeting.",
        "faq.q2": "What are the payment plans?",
        "faq.a2": "We offer flexible payment plans. We typically apply an installment payment system based on project phases. We prepare a customized plan for you during the quote phase.",
        "faq.q3": "Which regions do you serve?",
        "faq.a3": "We undertake projects throughout Turkey. We are particularly active in Istanbul, Ankara, Izmir, Antalya, and Bodrum. We can also discuss projects in other regions.",
        "faq.q4": "Do you provide warranty and after-sales support?",
        "faq.a4": "Yes, we provide a 2-year structural warranty on all our projects. Our 24/7 support line is available for any issues that may arise after delivery. Customer satisfaction is our priority.",
        "faq.q5": "Can changes be made during the project?",
        "faq.a5": "Reasonable changes can be made according to project progress. However, major changes may affect cost and timeline. We evaluate change requests with our project manager and offer the best solution.",

        // CTA
        "cta.title": "Let's Bring Your Project to Life",
        "cta.subtitle": "Let's plan your dream structure together. Contact us for free consultation and site visit.",
        "cta.contact": "Contact Us",
        "cta.catalog": "View Our Catalog",

        // About Page
        "about.title": "About Us",
        "about.subtitle": "Since 1999, we have been delivering projects with a reliable and quality-oriented service approach in the construction sector.",
        "about.storyTitle": "25 years of experience and trust",
        "about.storyP1": "Since our founding in 1999, Aslan Construction has been steadily progressing towards becoming one of Turkey's leading construction companies.",
        "about.storyP2": "We offer services across a wide spectrum, from residential projects to commercial buildings, renovation work to project consulting. We have made it our principle to maintain the highest level of customer satisfaction in every project and never compromise on quality.",
        "about.storyP3": "With our expert team, modern technology, and years of experience, we deliver your projects on time and within budget. We make a difference in the industry with our reliable business partners and meticulous working principles.",
        "about.valuesTitle": "Our Values",
        "about.valuesSubtitle": "Core principles that define how we work",
        "about.quality": "Quality",
        "about.qualityDesc": "We apply the highest quality standards in every project",
        "about.reliability": "Reliability",
        "about.reliabilityDesc": "We build trust by standing behind our word",
        "about.collaboration": "Collaboration",
        "about.collaborationDesc": "We build strong relationships with our clients and partners",
        "about.goalOriented": "Goal-Oriented",
        "about.goalOrientedDesc": "We achieve set goals on time and completely",
        "about.certificatesTitle": "Certificates & Awards",
        "about.certificatesSubtitle": "Official documents of our quality and success",

        // Services Page
        "servicesPage.title": "Our Services",
        "servicesPage.subtitle": "We offer comprehensive solutions in the construction sector. We carefully plan and professionally execute each project.",

        // Contact Page
        "contact.title": "Contact",
        "contact.subtitle": "Contact us for your projects",
        "contact.address": "Address",
        "contact.phone": "Phone",
        "contact.email": "Email",
        "contact.hours": "Working Hours",
        "contact.weekdays": "Monday - Friday: 09:00 - 18:00",
        "contact.saturday": "Saturday: 10:00 - 14:00",
        "contact.sendMessage": "Send a Message",
        "contact.name": "Your Name",
        "contact.subject": "Subject",
        "contact.message": "Your Message",
        "contact.send": "Send",

        // Quote Page
        "quote.title": "Get a Quote",
        "quote.subtitle": "Let us prepare a custom quote for your project",
        "quote.step1": "Project Information",
        "quote.step2": "Contact Information",
        "quote.step3": "Quote Summary",
        "quote.projectType": "Project Type",
        "quote.projectSize": "Project Size",
        "quote.budget": "Budget",
        "quote.timeline": "Timeline",
        "quote.description": "Project Description",
        "quote.next": "Next",
        "quote.back": "Back",
        "quote.submit": "Request Quote",

        // Blog
        "blog.title": "Blog",
        "blog.subtitle": "Articles about current developments, tips, and our projects in the construction industry",
        "blog.readMore": "Read More",
        "blog.latestPosts": "Latest Posts",

        // Footer
        "footer.description": "With 25 years of experience, we turn your dreams into reality with reliable and quality construction solutions.",
        "footer.quickLinks": "Quick Links",
        "footer.services": "Services",
        "footer.contact": "Contact",
        "footer.rights": "All rights reserved.",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms of Service",

        // Common
        "common.loading": "Loading...",
        "common.error": "An error occurred",
        "common.success": "Success",
        "common.close": "Close",
        "common.save": "Save",
        "common.cancel": "Cancel",
        "common.confirm": "Confirm",
        "common.search": "Search",
        "common.viewDetails": "View Details",
    },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>("tr")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLocale = localStorage.getItem("locale") as Locale
        if (savedLocale && (savedLocale === "tr" || savedLocale === "en")) {
            setLocaleState(savedLocale)
        }
    }, [])

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale)
        localStorage.setItem("locale", newLocale)
        // Dispatch custom event for components to listen
        window.dispatchEvent(new CustomEvent("localeChange", { detail: newLocale }))
    }

    const t = (key: string): string => {
        return translations[locale][key] || key
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

// Default translation function for SSR
const defaultT = (key: string): string => {
    return translations["tr"][key] || key
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    // Return default values for SSR (when context is not available)
    if (context === undefined) {
        return {
            locale: "tr" as Locale,
            setLocale: () => { },
            t: defaultT
        }
    }
    return context
}

// Hook for easy translation access
export function useTranslation() {
    const { t, locale } = useLanguage()
    return { t, locale }
}
