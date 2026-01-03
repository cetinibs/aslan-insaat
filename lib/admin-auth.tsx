"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminAuthContextType {
    isAuthenticated: boolean
    isLoading: boolean
    login: (username: string, password: string) => boolean
    logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Basit admin kimlik bilgileri (production'da güvenli bir şekilde saklanmalı)
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "aslan2025"
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Sayfa yüklendiğinde oturum kontrolü
        const checkAuth = () => {
            try {
                const authToken = localStorage.getItem("admin_auth")
                if (authToken === "authenticated") {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.error("Auth check error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        // Küçük bir gecikme ile kontrol et (hydration için)
        const timer = setTimeout(checkAuth, 100)
        return () => clearTimeout(timer)
    }, [])

    // Oturum açılmamışsa ve giriş sayfasında değilsek yönlendir
    useEffect(() => {
        if (!isLoading && !isAuthenticated && pathname !== "/admin/giris") {
            router.push("/admin/giris")
        }
    }, [isLoading, isAuthenticated, pathname, router])

    const login = (username: string, password: string): boolean => {
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            setIsAuthenticated(true)
            try {
                localStorage.setItem("admin_auth", "authenticated")
            } catch (error) {
                console.error("Login storage error:", error)
            }
            return true
        }
        return false
    }

    const logout = () => {
        setIsAuthenticated(false)
        try {
            localStorage.removeItem("admin_auth")
        } catch (error) {
            console.error("Logout storage error:", error)
        }
        router.push("/admin/giris")
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext)
    if (context === undefined) {
        throw new Error("useAdminAuth must be used within an AdminAuthProvider")
    }
    return context
}
