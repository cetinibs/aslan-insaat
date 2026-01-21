import type { MetadataRoute } from 'next'

// Projelerin dinamik listesi - veritabanından gelecek
const projectIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// Blog yazıları - dinamik olarak eklenebilir
const blogSlugs = ['istanbul-insaat-trendleri-2024', 'atasehir-konut-projeleri', 'surdurulebilir-yapi']

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://aslaninsaat.net'
    const currentDate = new Date()

    // Ana sayfalar
    const mainPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projeler`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.95,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/katalog`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/teklif`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sss`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    // Proje sayfaları - SEO için her proje ayrı sayfa
    const projectPages: MetadataRoute.Sitemap = projectIds.map((id) => ({
        url: `${baseUrl}/projeler/${id}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }))

    // Blog sayfaları
    const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.65,
    }))

    // Hizmet sayfaları (eğer varsa)
    const servicePages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/hizmetler/konut-insaati`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hizmetler/ticari-insaat`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hizmetler/tadilat-restorasyon`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]

    // İngilizce sayfalar
    const englishPages: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/en`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/en/projects`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/en/services`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/en/contact`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    return [
        ...mainPages,
        ...projectPages,
        ...blogPages,
        ...servicePages,
        ...englishPages,
    ]
}
