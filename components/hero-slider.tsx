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
    <div className="relative w-full h-[75vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] xl:h-[95vh] overflow-hidden bg-gray-900 z-0">
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
              className="object-cover object-center"
              quality={80}
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Overlay Gradient - Daha şık ve profesyonel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            <div className="absolute inset-0 bg-black/15" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 pb-20 sm:pb-24 md:pb-32">
            <div className={`transition-all duration-1000 transform ${index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}>
              <span className="inline-block py-2 px-4 mb-5 sm:mb-6 md:mb-7 rounded-full bg-primary/90 backdrop-blur-md text-white text-xs sm:text-sm md:text-base font-semibold tracking-wider shadow-lg border border-white/10">
                ASLAN İNŞAAT
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-5 sm:mb-6 md:mb-7 tracking-tight drop-shadow-2xl max-w-5xl mx-auto leading-[1.1] sm:leading-[1.15] md:leading-tight">
                {slide.title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light tracking-wide max-w-3xl mx-auto drop-shadow-lg">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-3 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 backdrop-blur-md text-white transition-all flex items-center justify-center group shadow-xl hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-3 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-black/50 border border-white/30 backdrop-blur-md text-white transition-all flex items-center justify-center group shadow-xl hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="group-hover:translate-x-0.5 transition-transform w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-2.5 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 shadow-lg ${index === currentSlide ? "bg-primary w-10 sm:w-12 md:w-14 lg:w-16" : "bg-white/50 w-2 sm:w-2.5 md:w-3 hover:bg-white/70 hover:w-3 sm:hover:w-4 md:hover:w-5"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
