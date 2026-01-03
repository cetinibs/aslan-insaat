"use client"

import { useState, useEffect, useRef } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguage, type Locale } from "@/lib/i18n"

interface LanguageSwitcherProps {
    variant?: "header" | "footer"
}

const languages = [
    { code: "tr" as Locale, label: "Türkçe", flag: "🇹🇷" },
    { code: "en" as Locale, label: "English", flag: "🇬🇧" },
]

export function LanguageSwitcher({ variant = "header" }: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)
    const { locale, setLocale } = useLanguage()
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Dışarı tıklandığında dropdown'u kapat
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLanguageChange = (newLocale: Locale) => {
        setLocale(newLocale)
        setIsOpen(false)
    }

    const currentLanguage = languages.find((lang) => lang.code === locale)

    if (variant === "footer") {
        return (
            <div className="flex gap-2">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${locale === lang.code
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                            }`}
                    >
                        {lang.flag} {lang.label}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all text-white"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <Globe size={18} />
                <span className="text-sm font-medium">{currentLanguage?.flag}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border z-50 animate-fade-in">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors ${locale === lang.code ? "bg-primary/5" : ""
                                }`}
                            role="option"
                            aria-selected={locale === lang.code}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <span className="flex-1 font-medium text-foreground">{lang.label}</span>
                            {locale === lang.code && (
                                <Check size={16} className="text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
