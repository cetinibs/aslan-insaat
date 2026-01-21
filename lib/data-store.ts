// Veri deposu - localStorage tabanlı (production'da veritabanı kullanılmalı)

export interface Service {
    id: string
    title: string
    titleEn: string
    description: string
    descriptionEn: string
    icon: string
    features: string[]
    featuresEn: string[]
}

export interface Project {
    id: string
    title: string
    category: "konut" | "ticari"
    status: "completed" | "ongoing"
    year: string
    location: string
    area: string
    units: string
    description: string
    descriptionEn: string
    features: string[]
    featuresEn: string[]
    images: string[]
    progress?: number
}

export interface BlogPost {
    id: string
    title: string
    titleEn: string
    excerpt: string
    excerptEn: string
    content: string
    contentEn: string
    author: string
    date: string
    category: string
    categoryEn: string
    featuredImage?: string
}

export interface SiteSettings {
    // Genel Bilgiler
    siteName: string
    siteNameEn: string
    siteDescription: string
    siteDescriptionEn: string
    siteKeywords: string
    siteKeywordsEn: string

    // Logo ve Görseller
    logo: string
    logoAlt: string
    favicon: string
    ogImage: string // Open Graph resmi (sosyal medya paylaşımı)

    // İletişim Bilgileri
    phone: string
    email: string
    address: string
    addressEn: string
    whatsapp: string

    // Sosyal Medya
    instagram: string
    facebook: string
    twitter: string
    linkedin: string
    youtube: string

    // Analytics ve Takip Kodları
    googleAnalyticsId: string
    googleTagManagerId: string
    facebookPixelId: string

    // Diğer Ayarlar
    copyrightText: string
    copyrightTextEn: string
}

// Varsayılan hizmetler
const defaultServices: Service[] = [
    {
        id: "1",
        title: "Konut Projeleri",
        titleEn: "Residential Projects",
        description: "Villa, apartman ve rezidans projelerinde uzman çözümler",
        descriptionEn: "Expert solutions for villa, apartment and residence projects",
        icon: "Home",
        features: ["Anahtar teslim", "Depreme dayanıklı", "Modern tasarım"],
        featuresEn: ["Turnkey", "Earthquake resistant", "Modern design"]
    },
    {
        id: "2",
        title: "Ticari Binalar",
        titleEn: "Commercial Buildings",
        description: "Ofis, plaza ve iş merkezi projeleri",
        descriptionEn: "Office, plaza and business center projects",
        icon: "Building2",
        features: ["A+ standartları", "Akıllı bina sistemleri", "Enerji verimliliği"],
        featuresEn: ["A+ standards", "Smart building systems", "Energy efficiency"]
    },
    {
        id: "3",
        title: "Tadilat & Renovasyon",
        titleEn: "Renovation & Remodeling",
        description: "Mevcut yapıların modernizasyonu ve yenilenmesi",
        descriptionEn: "Modernization and renovation of existing structures",
        icon: "Wrench",
        features: ["Hızlı teslim", "Minimum kesinti", "Maliyet optimizasyonu"],
        featuresEn: ["Fast delivery", "Minimum interruption", "Cost optimization"]
    },
    {
        id: "4",
        title: "Proje Danışmanlığı",
        titleEn: "Project Consulting",
        description: "İnşaat projeleriniz için profesyonel danışmanlık hizmeti",
        descriptionEn: "Professional consulting service for your construction projects",
        icon: "FileCheck",
        features: ["Fizibilite analizi", "Maliyet tahmini", "Süreç yönetimi"],
        featuresEn: ["Feasibility analysis", "Cost estimation", "Process management"]
    }
]

// Varsayılan projeler
const defaultProjects: Project[] = [
    {
        id: "1",
        title: "ERSA ORMAN EVLERİ",
        category: "konut",
        status: "completed",
        year: "2018",
        location: "Sultanbeyli, İstanbul",
        area: "15,000 m²",
        units: "24 villa",
        description: "Sultanbeyli ERSA ORMAN EVLERİ - Modern konut projesi",
        descriptionEn: "Sultanbeyli ERSA FOREST HOMES - Modern residential project",
        features: ["Depreme dayanıklı", "Özel bahçeli", "24 saat güvenlik"],
        featuresEn: ["Earthquake resistant", "Private garden", "24/7 security"],
        images: ["/ersa.jpeg"],
        progress: 100
    },
    {
        id: "5",
        title: "KUMBAŞI PROJESİ",
        category: "konut",
        status: "ongoing",
        year: "2025",
        location: "İstanbul",
        area: "8,500 m²",
        units: "36 daire",
        description: "Kumbaşı Projesi - Yeni nesil konut",
        descriptionEn: "Kumbasi Project - New generation housing",
        features: ["Akıllı ev sistemleri", "Güneş panelleri"],
        featuresEn: ["Smart home systems", "Solar panels"],
        images: ["/modern-apartment-building.png"],
        progress: 35
    },
    {
        id: "13",
        title: "ÇAKMAK MAHALLESİ PROJESİ",
        category: "konut",
        status: "ongoing",
        year: "2025",
        location: "Ümraniye, İstanbul",
        area: "5,200 m²",
        units: "24 daire",
        description: "Çakmak Mahallesi Projesi - Ümraniye'de devam eden modern konut projesi",
        descriptionEn: "Çakmak Mahallesi Project - Ongoing modern residential project in Ümraniye",
        features: ["Depreme dayanıklı yapı", "Modern mimari", "Merkezi konum", "Sosyal alanlar"],
        featuresEn: ["Earthquake resistant structure", "Modern architecture", "Central location", "Social areas"],
        images: [
            "/projects/cakmak-mahallesi/cakmak-1.jpg",
            "/projects/cakmak-mahallesi/cakmak-2.jpg",
            "/projects/cakmak-mahallesi/cakmak-3.jpg",
            "/projects/cakmak-mahallesi/cakmak-4.jpg",
            "/projects/cakmak-mahallesi/cakmak-5.jpg"
        ],
        progress: 60
    },
    {
        id: "14",
        title: "ATAŞEHİR PROJESİ",
        category: "konut",
        status: "ongoing",
        year: "2025",
        location: "Ataşehir, İstanbul",
        area: "4,800 m²",
        units: "28 daire",
        description: "Ataşehir Projesi - Modern mimari ve lüks yaşam alanları sunan prestijli konut projesi",
        descriptionEn: "Ataşehir Project - Prestigious residential project offering modern architecture and luxury living spaces",
        features: ["Depreme dayanıklı yapı", "Modern mimari", "Merkezi konum", "Lüks iç tasarım", "Ferforje balkonlar"],
        featuresEn: ["Earthquake resistant structure", "Modern architecture", "Central location", "Luxury interior design", "Wrought iron balconies"],
        images: [
            "/projects/atasehir/atasehir-1.jpg",
            "/projects/atasehir/atasehir-2.jpg"
        ],
        progress: 40
    }
]

// Varsayılan blog yazıları
const defaultBlogPosts: BlogPost[] = [
    {
        id: "1",
        title: "2025 İnşaat Trendleri: Sürdürülebilir Yapı Malzemeleri",
        titleEn: "2025 Construction Trends: Sustainable Building Materials",
        excerpt: "İnşaat sektöründe sürdürülebilirlik giderek daha önemli hale geliyor...",
        excerptEn: "Sustainability is becoming increasingly important in the construction sector...",
        content: "<h2>Sürdürülebilir İnşaatın Önemi</h2><p>İnşaat sektörü küresel karbon emisyonlarının önemli bir kaynağıdır...</p>",
        contentEn: "<h2>The Importance of Sustainable Construction</h2><p>The construction industry is a significant source of global carbon emissions...</p>",
        author: "Elif Yılmaz",
        date: "2024-12-15",
        category: "Trendler",
        categoryEn: "Trends"
    }
]

// Varsayılan site ayarları
const defaultSiteSettings: SiteSettings = {
    // Genel Bilgiler
    siteName: "Aslan İnşaat",
    siteNameEn: "Aslan Construction",
    siteDescription: "30 yılı aşkın tecrübesiyle güvenilir inşaat çözümleri sunan Aslan İnşaat, konut ve ticari projelerde kaliteyi ve müşteri memnuniyetini ön planda tutar.",
    siteDescriptionEn: "Aslan Construction offers reliable construction solutions with over 30 years of experience, prioritizing quality and customer satisfaction in residential and commercial projects.",
    siteKeywords: "inşaat, müteahhit, konut, bina, proje, istanbul, aslan inşaat",
    siteKeywordsEn: "construction, contractor, residential, building, project, istanbul, aslan construction",

    // Logo ve Görseller
    logo: "/images/aslan-insaat-logo - son.jpg",
    logoAlt: "Aslan İnşaat Logo",
    favicon: "/favicon.ico",
    ogImage: "/images/og-image.jpg",

    // İletişim Bilgileri
    phone: "+90 542 274 05 94",
    email: "info@aslaninsaat.net",
    address: "Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, İstanbul",
    addressEn: "Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, Istanbul",
    whatsapp: "+905422740594",

    // Sosyal Medya
    instagram: "https://www.instagram.com/aslaninsaat_com",
    facebook: "",
    twitter: "",
    linkedin: "",
    youtube: "",

    // Analytics ve Takip Kodları
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",

    // Diğer Ayarlar
    copyrightText: "© 2025 Aslan İnşaat. Tüm hakları saklıdır.",
    copyrightTextEn: "© 2025 Aslan Construction. All rights reserved."
}

// LocalStorage işlemleri
const STORAGE_KEYS = {
    services: "aslan_services",
    projects: "aslan_projects",
    blogPosts: "aslan_blog_posts",
    siteSettings: "aslan_site_settings"
}

// Hizmetler
export function getServices(): Service[] {
    if (typeof window === "undefined") return defaultServices
    const stored = localStorage.getItem(STORAGE_KEYS.services)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return defaultServices
        }
    }
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(defaultServices))
    return defaultServices
}

export function saveServices(services: Service[]): void {
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(services))
}

export function addService(service: Omit<Service, "id">): Service {
    const services = getServices()
    const newService = { ...service, id: Date.now().toString() }
    services.push(newService)
    saveServices(services)
    return newService
}

export function updateService(id: string, updates: Partial<Service>): Service | null {
    const services = getServices()
    const index = services.findIndex(s => s.id === id)
    if (index === -1) return null
    services[index] = { ...services[index], ...updates }
    saveServices(services)
    return services[index]
}

export function deleteService(id: string): boolean {
    const services = getServices()
    const filtered = services.filter(s => s.id !== id)
    if (filtered.length === services.length) return false
    saveServices(filtered)
    return true
}

// Projeler
export function getProjects(): Project[] {
    if (typeof window === "undefined") return defaultProjects
    const stored = localStorage.getItem(STORAGE_KEYS.projects)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return defaultProjects
        }
    }
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(defaultProjects))
    return defaultProjects
}

export function saveProjects(projects: Project[]): void {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects))
}

export function addProject(project: Omit<Project, "id">): Project {
    const projects = getProjects()
    const newProject = { ...project, id: Date.now().toString() }
    projects.push(newProject)
    saveProjects(projects)
    return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = getProjects()
    const index = projects.findIndex(p => p.id === id)
    if (index === -1) return null
    projects[index] = { ...projects[index], ...updates }
    saveProjects(projects)
    return projects[index]
}

export function deleteProject(id: string): boolean {
    const projects = getProjects()
    const filtered = projects.filter(p => p.id !== id)
    if (filtered.length === projects.length) return false
    saveProjects(filtered)
    return true
}

// Blog Yazıları
export function getBlogPosts(): BlogPost[] {
    if (typeof window === "undefined") return defaultBlogPosts
    const stored = localStorage.getItem(STORAGE_KEYS.blogPosts)
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return defaultBlogPosts
        }
    }
    localStorage.setItem(STORAGE_KEYS.blogPosts, JSON.stringify(defaultBlogPosts))
    return defaultBlogPosts
}

export function saveBlogPosts(posts: BlogPost[]): void {
    localStorage.setItem(STORAGE_KEYS.blogPosts, JSON.stringify(posts))
}

export function addBlogPost(post: Omit<BlogPost, "id">): BlogPost {
    const posts = getBlogPosts()
    const newPost = { ...post, id: Date.now().toString() }
    posts.push(newPost)
    saveBlogPosts(posts)
    return newPost
}

export function updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = getBlogPosts()
    const index = posts.findIndex(p => p.id === id)
    if (index === -1) return null
    posts[index] = { ...posts[index], ...updates }
    saveBlogPosts(posts)
    return posts[index]
}

export function deleteBlogPost(id: string): boolean {
    const posts = getBlogPosts()
    const filtered = posts.filter(p => p.id !== id)
    if (filtered.length === posts.length) return false
    saveBlogPosts(filtered)
    return true
}

// Site Ayarları
export function getSiteSettings(): SiteSettings {
    if (typeof window === "undefined") return defaultSiteSettings
    const stored = localStorage.getItem(STORAGE_KEYS.siteSettings)
    if (stored) {
        try {
            // Varsayılan ayarlarla birleştir (yeni alanlar için)
            return { ...defaultSiteSettings, ...JSON.parse(stored) }
        } catch {
            return defaultSiteSettings
        }
    }
    localStorage.setItem(STORAGE_KEYS.siteSettings, JSON.stringify(defaultSiteSettings))
    return defaultSiteSettings
}

export function saveSiteSettings(settings: SiteSettings): void {
    localStorage.setItem(STORAGE_KEYS.siteSettings, JSON.stringify(settings))
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
    const current = getSiteSettings()
    const updated = { ...current, ...updates }
    saveSiteSettings(updated)
    return updated
}
