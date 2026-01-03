"use client"

import { useState, useEffect, useRef } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Settings,
    Globe,
    Image,
    Phone,
    Share2,
    BarChart3,
    Save,
    Upload,
    Check,
    X,
    RefreshCw
} from "lucide-react"
import { getSiteSettings, saveSiteSettings, SiteSettings } from "@/lib/data-store"
import { useAdminAuth } from "@/lib/admin-auth"

export default function AyarlarPage() {
    const { isAuthenticated, isLoading: authLoading } = useAdminAuth()
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const logoInputRef = useRef<HTMLInputElement>(null)
    const faviconInputRef = useRef<HTMLInputElement>(null)
    const ogImageInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isAuthenticated) {
            setSettings(getSiteSettings())
        }
    }, [isAuthenticated])

    const handleChange = (field: keyof SiteSettings, value: string) => {
        if (!settings) return
        setSettings({ ...settings, [field]: value })
    }

    const handleSave = () => {
        if (!settings) return
        setIsSaving(true)

        setTimeout(() => {
            saveSiteSettings(settings)
            setIsSaving(false)
            setSaveSuccess(true)
            setTimeout(() => setSaveSuccess(false), 3000)
        }, 500)
    }

    const uploadFile = async (file: File, folder: string): Promise<string | null> => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", folder)

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })

            if (!response.ok) {
                throw new Error("Yükleme başarısız")
            }

            const data = await response.json()
            return data.url
        } catch (error) {
            console.error("Dosya yükleme hatası:", error)
            return null
        }
    }

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof SiteSettings,
        inputRef: React.RefObject<HTMLInputElement | null>
    ) => {
        const file = e.target.files?.[0]
        if (!file || !settings) return

        setIsUploading(true)
        const url = await uploadFile(file, "settings")
        if (url) {
            setSettings({ ...settings, [field]: url })
        }
        setIsUploading(false)
        if (inputRef.current) inputRef.current.value = ""
    }

    if (authLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    if (!settings) {
        return (
            <div className="flex h-screen items-center justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />

            <main className="flex-1 p-8 ml-64">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <Settings className="w-8 h-8 text-primary" />
                                Site Ayarları
                            </h1>
                            <p className="text-slate-600 mt-1">
                                Web sitenizin genel ayarlarını buradan yönetebilirsiniz
                            </p>
                        </div>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="gap-2"
                        >
                            {isSaving ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : saveSuccess ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            {saveSuccess ? "Kaydedildi!" : "Değişiklikleri Kaydet"}
                        </Button>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="general" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-5 h-12">
                            <TabsTrigger value="general" className="gap-2">
                                <Globe className="w-4 h-4" />
                                Genel
                            </TabsTrigger>
                            <TabsTrigger value="images" className="gap-2">
                                <Image className="w-4 h-4" />
                                Görseller
                            </TabsTrigger>
                            <TabsTrigger value="contact" className="gap-2">
                                <Phone className="w-4 h-4" />
                                İletişim
                            </TabsTrigger>
                            <TabsTrigger value="social" className="gap-2">
                                <Share2 className="w-4 h-4" />
                                Sosyal Medya
                            </TabsTrigger>
                            <TabsTrigger value="analytics" className="gap-2">
                                <BarChart3 className="w-4 h-4" />
                                Analytics
                            </TabsTrigger>
                        </TabsList>

                        {/* Genel Ayarlar */}
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Genel Bilgiler</CardTitle>
                                    <CardDescription>
                                        Site adı, açıklama ve SEO ayarları
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Site Adı (Türkçe)
                                            </label>
                                            <Input
                                                value={settings.siteName}
                                                onChange={(e) => handleChange("siteName", e.target.value)}
                                                placeholder="Aslan İnşaat"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Site Adı (İngilizce)
                                            </label>
                                            <Input
                                                value={settings.siteNameEn}
                                                onChange={(e) => handleChange("siteNameEn", e.target.value)}
                                                placeholder="Aslan Construction"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Site Açıklaması (Türkçe)
                                        </label>
                                        <Textarea
                                            value={settings.siteDescription}
                                            onChange={(e) => handleChange("siteDescription", e.target.value)}
                                            placeholder="Site açıklaması..."
                                            rows={3}
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Arama motorlarında görünecek açıklama (150-160 karakter önerilir)
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Site Açıklaması (İngilizce)
                                        </label>
                                        <Textarea
                                            value={settings.siteDescriptionEn}
                                            onChange={(e) => handleChange("siteDescriptionEn", e.target.value)}
                                            placeholder="Site description..."
                                            rows={3}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Anahtar Kelimeler (Türkçe)
                                            </label>
                                            <Input
                                                value={settings.siteKeywords}
                                                onChange={(e) => handleChange("siteKeywords", e.target.value)}
                                                placeholder="inşaat, müteahhit, konut..."
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Virgülle ayırarak yazın
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Anahtar Kelimeler (İngilizce)
                                            </label>
                                            <Input
                                                value={settings.siteKeywordsEn}
                                                onChange={(e) => handleChange("siteKeywordsEn", e.target.value)}
                                                placeholder="construction, contractor..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Telif Hakkı Yazısı (Türkçe)
                                            </label>
                                            <Input
                                                value={settings.copyrightText}
                                                onChange={(e) => handleChange("copyrightText", e.target.value)}
                                                placeholder="© 2025 Aslan İnşaat..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Telif Hakkı Yazısı (İngilizce)
                                            </label>
                                            <Input
                                                value={settings.copyrightTextEn}
                                                onChange={(e) => handleChange("copyrightTextEn", e.target.value)}
                                                placeholder="© 2025 Aslan Construction..."
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Görseller */}
                        <TabsContent value="images">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Logo ve Görseller</CardTitle>
                                    <CardDescription>
                                        Site logosu, favicon ve sosyal medya görseli
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Logo */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Site Logosu
                                        </label>
                                        <div className="flex items-start gap-4">
                                            <div className="w-48 h-24 bg-slate-100 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                                                {settings.logo ? (
                                                    <img
                                                        src={settings.logo}
                                                        alt="Logo"
                                                        className="max-w-full max-h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-slate-400 text-sm">Logo yok</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => logoInputRef.current?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Yükle
                                                    </Button>
                                                    {settings.logo && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => handleChange("logo", "")}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <Input
                                                    value={settings.logo}
                                                    onChange={(e) => handleChange("logo", e.target.value)}
                                                    placeholder="/images/logo.png"
                                                    className="mt-2"
                                                />
                                                <input
                                                    ref={logoInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, "logo", logoInputRef)}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logo Alt Text */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Logo Alt Metni
                                        </label>
                                        <Input
                                            value={settings.logoAlt}
                                            onChange={(e) => handleChange("logoAlt", e.target.value)}
                                            placeholder="Aslan İnşaat Logo"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            SEO ve erişilebilirlik için önemli
                                        </p>
                                    </div>

                                    {/* Favicon */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Favicon
                                        </label>
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 bg-slate-100 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                                                {settings.favicon ? (
                                                    <img
                                                        src={settings.favicon}
                                                        alt="Favicon"
                                                        className="max-w-full max-h-full"
                                                    />
                                                ) : (
                                                    <span className="text-slate-400 text-xs">ico</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => faviconInputRef.current?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Yükle
                                                    </Button>
                                                </div>
                                                <Input
                                                    value={settings.favicon}
                                                    onChange={(e) => handleChange("favicon", e.target.value)}
                                                    placeholder="/favicon.ico"
                                                    className="mt-2"
                                                />
                                                <input
                                                    ref={faviconInputRef}
                                                    type="file"
                                                    accept=".ico,image/png"
                                                    onChange={(e) => handleImageUpload(e, "favicon", faviconInputRef)}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* OG Image */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Sosyal Medya Paylaşım Görseli (Open Graph)
                                        </label>
                                        <div className="flex items-start gap-4">
                                            <div className="w-64 h-36 bg-slate-100 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden">
                                                {settings.ogImage ? (
                                                    <img
                                                        src={settings.ogImage}
                                                        alt="OG Image"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-slate-400 text-sm">1200x630px önerilir</span>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => ogImageInputRef.current?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="w-4 h-4 mr-2" />
                                                        Yükle
                                                    </Button>
                                                    {settings.ogImage && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            onClick={() => handleChange("ogImage", "")}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                                <Input
                                                    value={settings.ogImage}
                                                    onChange={(e) => handleChange("ogImage", e.target.value)}
                                                    placeholder="/images/og-image.jpg"
                                                    className="mt-2"
                                                />
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Sosyal medyada paylaşıldığında görünecek görsel (1200x630px)
                                                </p>
                                                <input
                                                    ref={ogImageInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(e, "ogImage", ogImageInputRef)}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* İletişim */}
                        <TabsContent value="contact">
                            <Card>
                                <CardHeader>
                                    <CardTitle>İletişim Bilgileri</CardTitle>
                                    <CardDescription>
                                        Telefon, e-posta ve adres bilgileri
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Telefon
                                            </label>
                                            <Input
                                                value={settings.phone}
                                                onChange={(e) => handleChange("phone", e.target.value)}
                                                placeholder="+90 542 274 05 94"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                WhatsApp Numarası
                                            </label>
                                            <Input
                                                value={settings.whatsapp}
                                                onChange={(e) => handleChange("whatsapp", e.target.value)}
                                                placeholder="+905422740594"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Başında + ile, boşluksuz yazın
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            E-posta
                                        </label>
                                        <Input
                                            value={settings.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            placeholder="info@aslaninsaat.net"
                                            type="email"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Adres (Türkçe)
                                            </label>
                                            <Textarea
                                                value={settings.address}
                                                onChange={(e) => handleChange("address", e.target.value)}
                                                placeholder="Adres..."
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Adres (İngilizce)
                                            </label>
                                            <Textarea
                                                value={settings.addressEn}
                                                onChange={(e) => handleChange("addressEn", e.target.value)}
                                                placeholder="Address..."
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Sosyal Medya */}
                        <TabsContent value="social">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sosyal Medya Hesapları</CardTitle>
                                    <CardDescription>
                                        Sosyal medya profil bağlantıları
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Instagram
                                            </label>
                                            <Input
                                                value={settings.instagram}
                                                onChange={(e) => handleChange("instagram", e.target.value)}
                                                placeholder="https://instagram.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Facebook
                                            </label>
                                            <Input
                                                value={settings.facebook}
                                                onChange={(e) => handleChange("facebook", e.target.value)}
                                                placeholder="https://facebook.com/..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Twitter / X
                                            </label>
                                            <Input
                                                value={settings.twitter}
                                                onChange={(e) => handleChange("twitter", e.target.value)}
                                                placeholder="https://twitter.com/..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                LinkedIn
                                            </label>
                                            <Input
                                                value={settings.linkedin}
                                                onChange={(e) => handleChange("linkedin", e.target.value)}
                                                placeholder="https://linkedin.com/company/..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            YouTube
                                        </label>
                                        <Input
                                            value={settings.youtube}
                                            onChange={(e) => handleChange("youtube", e.target.value)}
                                            placeholder="https://youtube.com/@..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Analytics */}
                        <TabsContent value="analytics">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analytics ve Takip Kodları</CardTitle>
                                    <CardDescription>
                                        Google Analytics, Tag Manager ve Facebook Pixel ayarları
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Google Analytics ID
                                        </label>
                                        <Input
                                            value={settings.googleAnalyticsId}
                                            onChange={(e) => handleChange("googleAnalyticsId", e.target.value)}
                                            placeholder="G-XXXXXXXXXX"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Google Analytics 4 ölçüm kimliği (G- ile başlar)
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Google Tag Manager ID
                                        </label>
                                        <Input
                                            value={settings.googleTagManagerId}
                                            onChange={(e) => handleChange("googleTagManagerId", e.target.value)}
                                            placeholder="GTM-XXXXXXX"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Google Tag Manager container kimliği (GTM- ile başlar)
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Facebook Pixel ID
                                        </label>
                                        <Input
                                            value={settings.facebookPixelId}
                                            onChange={(e) => handleChange("facebookPixelId", e.target.value)}
                                            placeholder="123456789012345"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Facebook/Meta Pixel kimliği (15 haneli sayı)
                                        </p>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <p className="text-sm text-amber-800">
                                            <strong>Not:</strong> Takip kodlarının etkinleşmesi için siteyi yeniden deploy etmeniz gerekebilir.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
