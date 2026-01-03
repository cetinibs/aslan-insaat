"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAdminAuth } from "@/lib/admin-auth"
import {
    LayoutDashboard,
    Wrench,
    FolderKanban,
    FileText,
    LogOut,
    Building2,
    Menu,
    X,
    Settings
} from "lucide-react"
import { useState } from "react"

const menuItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/hizmetler", label: "Hizmetler", icon: Wrench },
    { href: "/admin/projeler", label: "Projeler", icon: FolderKanban },
    { href: "/admin/blog", label: "Blog Yazıları", icon: FileText },
    { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const { logout } = useAdminAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-amber-500" />
                    <span className="font-bold">Admin Panel</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-slate-800 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50
        transform transition-transform duration-300
        lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
                <div className="p-6 border-b border-slate-700">
                    <Link href="/admin" className="flex items-center gap-3">
                        <Building2 className="w-10 h-10 text-amber-500" />
                        <div>
                            <h1 className="font-bold text-lg">Aslan İnşaat</h1>
                            <p className="text-xs text-slate-400">Yönetim Paneli</p>
                        </div>
                    </Link>
                </div>

                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                  ${isActive
                                        ? "bg-amber-500 text-slate-900 font-semibold"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }
                `}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors mb-2"
                    >
                        <Building2 size={20} />
                        <span>Siteyi Görüntüle</span>
                    </Link>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Çıkış Yap</span>
                    </button>
                </div>
            </aside>
        </>
    )
}
