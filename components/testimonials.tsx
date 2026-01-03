"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
    {
        id: 1,
        name: "Ahmet Yılmaz",
        position: "Müteahhit",
        project: "Villa Bodrum - 2023",
        text: "Aslan İnşaat ile çalışmak büyük bir keyifti. Villa projemiz zamanında ve beklentilerimizin üzerinde tamamlandı. Profesyonel ekip, kaliteli işçilik ve şeffaf iletişim için teşekkürler.",
        rating: 5,
        image: null,
    },
    {
        id: 2,
        name: "Zeynep Demir",
        position: "İşletme Sahibi",
        project: "Office Tower İzmir - 2024",
        text: "Ofis binamızın inşaatında Aslan İnşaat'ın uzmanlığından çok memnun kaldık. Teknik bilgi, proje yönetimi ve kalite kontrol konularında gerçekten profesyoneller.",
        rating: 5,
        image: null,
    },
    {
        id: 3,
        name: "Mehmet Kara",
        position: "Yatırımcı",
        project: "Residence İstanbul - 2024",
        text: "Rezidans projemizde Aslan İnşaat'ın deneyimi ve güvenilirliği sayesinde sorunsuz bir süreç yaşadık. Düzenli raporlama ve şeffaf maliyet yönetimi çok değerliydi.",
        rating: 5,
        image: null,
    },
    {
        id: 4,
        name: "Fatma Özkan",
        position: "Ev Sahibi",
        project: "ERSA Orman Evleri - 2018",
        text: "Hayalimizdeki evi Aslan İnşaat ile gerçekleştirdik. Her detay özenle düşünülmüş, kaliteli malzeme kullanılmış. Kesinlikle tavsiye ediyorum.",
        rating: 5,
        image: null,
    },
    {
        id: 5,
        name: "Ali Çelik",
        position: "Plaza Yöneticisi",
        project: "Ferhat Paşa İş Merkezi - 2018",
        text: "İş merkezimiz tam zamanında teslim edildi. Ekip her zaman ulaşılabilir ve çözüm odaklıydı. Profesyonel yaklaşımları için tekrar teşekkür ederiz.",
        rating: 5,
        image: null,
    },
]

export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToNext = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const goToPrev = () => {
        setIsAutoPlaying(false)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-semibold text-amber-400 mb-4 backdrop-blur-sm">
                        Müşteri Yorumları
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                        Müşterilerimiz Ne Diyor?
                    </h2>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
                        Tamamladığımız projelerdeki müşteri memnuniyeti ve güven
                    </p>
                </div>

                {/* Main Testimonial Slider */}
                <div className="relative max-w-4xl mx-auto">
                    <div ref={containerRef} className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 md:p-12 relative overflow-hidden">
                                        <Quote className="absolute top-6 right-6 w-16 h-16 text-amber-500/20" />

                                        <div className="flex gap-1 mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} size={24} className="fill-amber-400 text-amber-400" />
                                            ))}
                                        </div>

                                        <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 relative z-10">
                                            "{testimonial.text}"
                                        </p>

                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg">
                                                {getInitials(testimonial.name)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-xl text-white">{testimonial.name}</div>
                                                <div className="text-amber-400 font-medium">{testimonial.position}</div>
                                                <div className="text-sm text-white/60">{testimonial.project}</div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                        aria-label="Önceki yorum"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                        aria-label="Sonraki yorum"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setIsAutoPlaying(false)
                                    setCurrentIndex(index)
                                }}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
                                        ? "bg-amber-400 w-8"
                                        : "bg-white/30 hover:bg-white/50"
                                    }`}
                                aria-label={`${index + 1}. yoruma git`}
                            />
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
                    {[
                        { number: "500+", label: "Mutlu Müşteri" },
                        { number: "150+", label: "Tamamlanan Proje" },
                        { number: "%98", label: "Memnuniyet Oranı" },
                        { number: "25+", label: "Yıllık Deneyim" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1">{stat.number}</div>
                            <div className="text-sm text-white/70">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
