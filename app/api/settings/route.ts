import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Varsayılan site ayarları
const defaultSettings: Record<string, { value: string; type: string; group: string }> = {
    // Genel Bilgiler
    siteName: { value: 'Aslan İnşaat', type: 'string', group: 'general' },
    siteNameEn: { value: 'Aslan Construction', type: 'string', group: 'general' },
    siteDescription: { value: '30 yılı aşkın tecrübesiyle güvenilir inşaat çözümleri sunan Aslan İnşaat, konut ve ticari projelerde kaliteyi ve müşteri memnuniyetini ön planda tutar.', type: 'string', group: 'seo' },
    siteDescriptionEn: { value: 'Aslan Construction offers reliable construction solutions with over 30 years of experience, prioritizing quality and customer satisfaction in residential and commercial projects.', type: 'string', group: 'seo' },
    siteKeywords: { value: 'inşaat, müteahhit, konut, bina, proje, istanbul, aslan inşaat', type: 'string', group: 'seo' },
    siteKeywordsEn: { value: 'construction, contractor, residential, building, project, istanbul, aslan construction', type: 'string', group: 'seo' },

    // Logo ve Görseller
    logo: { value: '/images/aslan-insaat-logo - son.jpg', type: 'string', group: 'general' },
    logoAlt: { value: 'Aslan İnşaat Logo', type: 'string', group: 'general' },
    favicon: { value: '/favicon.ico', type: 'string', group: 'general' },
    ogImage: { value: '/images/og-image.jpg', type: 'string', group: 'seo' },

    // İletişim Bilgileri
    phone: { value: '+90 542 274 05 94', type: 'string', group: 'contact' },
    email: { value: 'info@aslaninsaat.net', type: 'string', group: 'contact' },
    address: { value: 'Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, İstanbul', type: 'string', group: 'contact' },
    addressEn: { value: 'Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, Istanbul', type: 'string', group: 'contact' },
    whatsapp: { value: '+905422740594', type: 'string', group: 'contact' },

    // Sosyal Medya
    instagram: { value: 'https://www.instagram.com/aslaninsaat', type: 'string', group: 'social' },
    facebook: { value: '', type: 'string', group: 'social' },
    twitter: { value: '', type: 'string', group: 'social' },
    linkedin: { value: '', type: 'string', group: 'social' },
    youtube: { value: '', type: 'string', group: 'social' },

    // Analytics
    googleAnalyticsId: { value: '', type: 'string', group: 'analytics' },
    googleTagManagerId: { value: '', type: 'string', group: 'analytics' },
    facebookPixelId: { value: '', type: 'string', group: 'analytics' },

    // Diğer
    copyrightText: { value: '© 2025 Aslan İnşaat. Tüm hakları saklıdır.', type: 'string', group: 'general' },
    copyrightTextEn: { value: '© 2025 Aslan Construction. All rights reserved.', type: 'string', group: 'general' },
}

// GET - Tüm site ayarlarını getir
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const group = searchParams.get('group')

        const where: Record<string, unknown> = {}
        if (group) {
            where.group = group
        }

        const settings = await prisma.siteSetting.findMany({ where })

        // Veritabanında ayar yoksa varsayılanları döndür
        if (settings.length === 0) {
            // Varsayılanları key-value objesi olarak döndür
            const result: Record<string, string> = {}
            for (const [key, setting] of Object.entries(defaultSettings)) {
                result[key] = setting.value
            }
            return NextResponse.json(result)
        }

        // Ayarları key-value objesi olarak döndür
        const result: Record<string, string> = {}
        for (const setting of settings) {
            result[setting.key] = setting.value
        }

        // Eksik ayarlar için varsayılanları ekle
        for (const [key, defaultSetting] of Object.entries(defaultSettings)) {
            if (!(key in result)) {
                result[key] = defaultSetting.value
            }
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error('Settings fetch error:', error)
        return NextResponse.json(
            { error: 'Ayarlar yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// POST - Ayarları güncelle (bulk update)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Her ayarı upsert et
        const updates = Object.entries(body).map(async ([key, value]) => {
            const settingInfo = defaultSettings[key] || { type: 'string', group: 'general' }

            return prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: {
                    key,
                    value: String(value),
                    type: settingInfo.type,
                    group: settingInfo.group,
                },
            })
        })

        await Promise.all(updates)

        return NextResponse.json({ success: true, message: 'Ayarlar güncellendi' })
    } catch (error) {
        console.error('Settings update error:', error)
        return NextResponse.json(
            { error: 'Ayarlar güncellenirken hata oluştu' },
            { status: 500 }
        )
    }
}
