"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown, Search, HelpCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function SSSPage() {
    const { t, locale } = useLanguage()
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("genel")
    const [openItems, setOpenItems] = useState<string[]>([])

    const faqCategories = locale === "en" ? [
        {
            id: "genel",
            label: "General Questions",
            faqs: [
                {
                    question: "What is the project delivery time?",
                    answer: "Project timelines vary based on the size and complexity of the structure. Residential projects average 12-18 months, commercial buildings 18-24 months. We provide a detailed timeline at the initial meeting."
                },
                {
                    question: "Which regions do you serve?",
                    answer: "We undertake projects throughout Turkey. We are particularly active in Istanbul, Ankara, Izmir, Antalya, and Bodrum. We can also discuss projects in other regions."
                },
                {
                    question: "Do you offer free site visits?",
                    answer: "Yes, we offer free site visit services for projects in Istanbul and surrounding areas. For other cities, please contact us for information about transportation costs."
                },
            ]
        },
        {
            id: "odeme",
            label: "Payment & Contract",
            faqs: [
                {
                    question: "What are the payment plans?",
                    answer: "We offer flexible payment plans. We typically apply an installment payment system based on project phases. We prepare a customized plan for you during the quote phase."
                },
                {
                    question: "Is a contract signed?",
                    answer: "Yes, a detailed contract is prepared for all projects. The contract clearly states the project scope, timeline, payment plan, and warranty terms."
                },
                {
                    question: "Will there be additional costs?",
                    answer: "There are no additional costs within the scope defined in the contract. However, changes requested by the customer or unexpected ground conditions may require additional costs. These situations are communicated to you in advance."
                },
            ]
        },
        {
            id: "proje",
            label: "Project Process",
            faqs: [
                {
                    question: "How can I track the project progress?",
                    answer: "We provide regular progress reports to all our customers. You can track your project status with weekly or monthly reports. You can also make appointments for site visits."
                },
                {
                    question: "Can changes be made during the project?",
                    answer: "Reasonable changes can be made according to project progress. However, major changes may affect cost and timeline. We evaluate change requests with our project manager and offer the best solution."
                },
                {
                    question: "Can I have a say in material selection?",
                    answer: "Absolutely! We select the materials to be used in your project together. We offer different options and price alternatives, planning according to your preferences."
                },
            ]
        },
        {
            id: "garanti",
            label: "Warranty & Support",
            faqs: [
                {
                    question: "What is the warranty period?",
                    answer: "We provide a 2-year structural warranty on all our projects. Separate warranty periods are available for electrical, plumbing, and other systems."
                },
                {
                    question: "Do you provide post-delivery support?",
                    answer: "Yes, we have a support line for any issues that may arise after delivery. Problems covered under warranty are fixed free of charge."
                },
                {
                    question: "Do you provide maintenance services?",
                    answer: "We offer periodic maintenance services after delivery. With annual maintenance agreements, we help you preserve the value of your building."
                },
            ]
        },
    ] : [
        {
            id: "genel",
            label: "Genel Sorular",
            faqs: [
                {
                    question: "Proje teslim süresi ne kadar?",
                    answer: "Proje süreleri, yapının büyüklüğü ve kompleksliğine göre değişmektedir. Konut projeleri ortalama 12-18 ay, ticari binalar 18-24 ay arası sürmektedir. İlk görüşmede size detaylı bir zaman çizelgesi sunuyoruz."
                },
                {
                    question: "Hangi bölgelerde hizmet veriyorsunuz?",
                    answer: "Türkiye genelinde projeler gerçekleştiriyoruz. Özellikle İstanbul, Ankara, İzmir, Antalya ve Bodrum bölgelerinde aktif olarak çalışıyoruz. Diğer bölgeler için de görüşme yapabiliriz."
                },
                {
                    question: "Ücretsiz keşif yapıyor musunuz?",
                    answer: "Evet, İstanbul ve çevresindeki projeler için ücretsiz keşif hizmeti sunuyoruz. Diğer şehirler için ulaşım masrafları konusunda bilgi almak için bizimle iletişime geçebilirsiniz."
                },
            ]
        },
        {
            id: "odeme",
            label: "Ödeme & Sözleşme",
            faqs: [
                {
                    question: "Ödeme planları nasıl oluyor?",
                    answer: "Esnek ödeme planları sunuyoruz. Genellikle proje aşamalarına göre taksitli ödeme sistemi uyguluyoruz. Detaylı fiyatlandırma ve ödeme koşulları için teklif aşamasında size özel plan hazırlıyoruz."
                },
                {
                    question: "Sözleşme yapılıyor mu?",
                    answer: "Evet, tüm projeler için detaylı bir sözleşme hazırlanmaktadır. Sözleşmede proje kapsamı, süre, ödeme planı ve garanti koşulları açıkça belirtilmektedir."
                },
                {
                    question: "Ek maliyet çıkar mı?",
                    answer: "Sözleşmede belirlenen kapsam dahilinde ek maliyet çıkmaz. Ancak müşteri tarafından talep edilen değişiklikler veya beklenmeyen zemin koşulları ek maliyet gerektirebilir. Bu durumlar önceden size bildirilir."
                },
            ]
        },
        {
            id: "proje",
            label: "Proje Süreci",
            faqs: [
                {
                    question: "Proje sürecini nasıl takip edebilirim?",
                    answer: "Her müşterimize düzenli ilerleme raporları sunuyoruz. Haftalık veya aylık raporlarla projenizin durumunu takip edebilirsiniz. Ayrıca şantiye ziyaretleri için randevu alabilirsiniz."
                },
                {
                    question: "Proje sırasında değişiklik yapılabilir mi?",
                    answer: "Proje ilerleyişine göre makul değişiklikler yapılabilir. Ancak büyük değişiklikler maliyet ve süre açısından etkileyebilir. Değişiklik taleplerini proje yöneticimiz ile değerlendiriyor ve size en iyi çözümü sunuyoruz."
                },
                {
                    question: "Malzeme seçiminde söz sahibi olabilir miyim?",
                    answer: "Kesinlikle! Projenizde kullanılacak malzemeleri birlikte seçiyoruz. Size farklı seçenekler ve fiyat alternatifleri sunuyor, tercihlerinize göre planlama yapıyoruz."
                },
            ]
        },
        {
            id: "garanti",
            label: "Garanti & Destek",
            faqs: [
                {
                    question: "Garanti süresi ne kadar?",
                    answer: "Tüm projelerimizde 2 yıl yapısal garanti veriyoruz. Elektrik, tesisat ve diğer sistemler için de ayrı garanti süreleri mevcuttur."
                },
                {
                    question: "Teslim sonrası destek sağlıyor musunuz?",
                    answer: "Evet, teslim sonrası oluşabilecek herhangi bir sorun için destek hattımız mevcuttur. Garanti kapsamındaki sorunlar ücretsiz giderilir."
                },
                {
                    question: "Bakım hizmeti veriyor musunuz?",
                    answer: "Teslim sonrası periyodik bakım hizmetleri sunuyoruz. Yıllık bakım anlaşmaları ile yapınızın değerini korumanıza yardımcı oluyoruz."
                },
            ]
        },
    ]

    const content = locale === "en" ? {
        helpCenter: "Help Center",
        title: "Frequently Asked Questions",
        subtitle: "Answers to all your questions about construction processes",
        searchPlaceholder: "Search questions...",
        ctaTitle: "Couldn't Find Your Answer?",
        ctaSubtitle: "Contact us directly, we'll answer all your questions.",
        contactUs: "Contact Us",
        whatsapp: "Write on WhatsApp"
    } : {
        helpCenter: "Yardım Merkezi",
        title: "Sıkça Sorulan Sorular",
        subtitle: "İnşaat süreçleri hakkında merak ettiğiniz tüm soruların yanıtları",
        searchPlaceholder: "Soru ara...",
        ctaTitle: "Sorunuzun Cevabını Bulamadınız mı?",
        ctaSubtitle: "Bize doğrudan ulaşın, tüm sorularınızı yanıtlayalım.",
        contactUs: "İletişime Geçin",
        whatsapp: "WhatsApp ile Yazın"
    }

    const toggleItem = (id: string) => {
        setOpenItems((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    const filteredCategories = faqCategories.map((category) => ({
        ...category,
        faqs: category.faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter((category) => category.faqs.length > 0)

    const displayCategories = searchQuery ? filteredCategories : faqCategories

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6">
                            <HelpCircle size={18} />
                            {content.helpCenter}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                            {content.title}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            {content.subtitle}
                        </p>

                        {/* Search */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                            <input
                                type="text"
                                placeholder={content.searchPlaceholder}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Category Tabs */}
                        {!searchQuery && (
                            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-6 py-3 rounded-full font-medium transition-all ${activeCategory === category.id
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted hover:bg-muted/80"
                                            }`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {(searchQuery ? displayCategories : displayCategories.filter(c => c.id === activeCategory)).map((category) => (
                                <div key={category.id}>
                                    {searchQuery && (
                                        <h3 className="text-lg font-semibold text-primary mb-4">{category.label}</h3>
                                    )}
                                    <div className="space-y-3">
                                        {category.faqs.map((faq, index) => {
                                            const itemId = `${category.id}-${index}`
                                            const isOpen = openItems.includes(itemId)

                                            return (
                                                <div
                                                    key={itemId}
                                                    className="border rounded-2xl overflow-hidden bg-card hover:shadow-md transition-all"
                                                >
                                                    <button
                                                        onClick={() => toggleItem(itemId)}
                                                        className="w-full flex items-center justify-between p-6 text-left"
                                                    >
                                                        <span className="font-semibold text-lg pr-4">{faq.question}</span>
                                                        <ChevronDown
                                                            className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                                }`}
                                                            size={24}
                                                        />
                                                    </button>
                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                            }`}
                                                    >
                                                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                            {faq.answer}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
                            <h3 className="text-2xl font-bold mb-4">{content.ctaTitle}</h3>
                            <p className="text-muted-foreground mb-6">
                                {content.ctaSubtitle}
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <a
                                    href="/iletisim"
                                    className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
                                >
                                    {content.contactUs}
                                </a>
                                <a
                                    href="https://wa.me/905321234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 rounded-xl bg-green-500 text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    {content.whatsapp}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
