"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Monitor } from "lucide-react"

type Theme = "light" | "dark" | "system"

export function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>("system")
    const [mounted, setMounted] = useState(false)

    // Hydration sorunlarını önlemek için
    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem("theme") as Theme
        if (savedTheme) {
            setTheme(savedTheme)
            applyTheme(savedTheme)
        } else {
            applyTheme("system")
        }
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement

        if (newTheme === "system") {
            const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            root.classList.toggle("dark", systemPrefersDark)
        } else {
            root.classList.toggle("dark", newTheme === "dark")
        }
    }

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        applyTheme(newTheme)
    }

    // System theme değişikliklerini dinle
    useEffect(() => {
        if (theme !== "system") return

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => applyTheme("system")

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
        )
    }

    return (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-sm">
            <button
                onClick={() => handleThemeChange("light")}
                className={`p-2 rounded-lg transition-all ${theme === "light"
                        ? "bg-white/20 text-amber-400"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Aydınlık mod"
                title="Aydınlık mod"
            >
                <Sun size={18} />
            </button>
            <button
                onClick={() => handleThemeChange("dark")}
                className={`p-2 rounded-lg transition-all ${theme === "dark"
                        ? "bg-white/20 text-blue-400"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Karanlık mod"
                title="Karanlık mod"
            >
                <Moon size={18} />
            </button>
            <button
                onClick={() => handleThemeChange("system")}
                className={`p-2 rounded-lg transition-all ${theme === "system"
                        ? "bg-white/20 text-emerald-400"
                        : "text-white/60 hover:text-white hover:bg-white/10"
                    }`}
                aria-label="Sistem ayarı"
                title="Sistem ayarı"
            >
                <Monitor size={18} />
            </button>
        </div>
    )
}
