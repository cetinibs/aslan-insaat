"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export function HeroSlider() {
  const { locale } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = locale === "en" ? [
    {
      image: "/images/slider-1.png",
      title: "Aslan Construction & Contracting",
      subtitle: "Buildings Rising with Trust",
    },
    {
      image: "/images/slider-2.png",
      title: "Buildings Rising with Trust",
      subtitle: "25+ Years of Experience",
    },
    {
      image: "/images/slider-3.png",
      title: "Starts with Planning, Rises with Commitment",
      subtitle: "Modern Architectural Solutions",
    },
  ] : [
    {
      image: "/images/slider-1.png",
      title: "Aslan İnşaat & Taahhüt",
      subtitle: "Güvenle Yükselen Yapılar",
    },
    {
      image: "/images/slider-2.png",
      title: "Güvenle Yükselen Yapılar",
      subtitle: "25+ Yıllık Deneyim",
    },
    {
      image: "/images/slider-3.png",
      title: "Planla Başlar, Taahhütle Yükselir",
      subtitle: "Modern Mimari Çözümler",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden bg-gray-900 z-0 mt-20">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 overflow-hidden ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />


        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white group-hover:scale-110 transition-transform" size={28} />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white group-hover:scale-110 transition-transform" size={28} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </div>
  )
}
