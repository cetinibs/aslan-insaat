"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
    children: React.ReactNode
    className?: string
    animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "zoom-in"
    delay?: number
    duration?: number
    threshold?: number
}

export function ScrollAnimation({
    children,
    className = "",
    animation = "fade-in",
    delay = 0,
    duration = 600,
    threshold = 0.1,
}: ScrollAnimationProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [threshold])

    const getAnimationStyles = () => {
        const baseStyles: React.CSSProperties = {
            transition: `all ${duration}ms ease-out`,
            transitionDelay: `${delay}ms`,
        }

        if (!isVisible) {
            switch (animation) {
                case "fade-in":
                    return { ...baseStyles, opacity: 0 }
                case "slide-up":
                    return { ...baseStyles, opacity: 0, transform: "translateY(40px)" }
                case "slide-left":
                    return { ...baseStyles, opacity: 0, transform: "translateX(40px)" }
                case "slide-right":
                    return { ...baseStyles, opacity: 0, transform: "translateX(-40px)" }
                case "zoom-in":
                    return { ...baseStyles, opacity: 0, transform: "scale(0.9)" }
                default:
                    return { ...baseStyles, opacity: 0 }
            }
        }

        return { ...baseStyles, opacity: 1, transform: "translateY(0) translateX(0) scale(1)" }
    }

    return (
        <div ref={ref} className={className} style={getAnimationStyles()}>
            {children}
        </div>
    )
}

// Counter animation for statistics
interface CounterProps {
    end: number
    suffix?: string
    prefix?: string
    duration?: number
}

export function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * end))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isVisible, end, duration])

    return (
        <span ref={ref}>
            {prefix}{count}{suffix}
        </span>
    )
}
