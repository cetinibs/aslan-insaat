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
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900 z-0">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          {/* Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 pt-16">
            <div className={`transition-all duration-1000 transform ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
              <span className="inline-block py-1 px-3 mb-4 rounded-full bg-secondary/80 text-white text-xs md:text-sm font-medium tracking-wider backdrop-blur-sm">
                ASLAN İNŞAAT
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight drop-shadow-xl max-w-4xl mx-auto leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 backdrop-blur-md text-white transition-all flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 backdrop-blur-md text-white transition-all flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="group-hover:translate-x-0.5 transition-transform w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-secondary w-8 md:w-10" : "bg-white/40 w-1.5 md:w-2 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
