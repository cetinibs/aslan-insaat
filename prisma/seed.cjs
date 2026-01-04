// Seed script - CommonJS for Node.js compatibility
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Veritabanı seed işlemi başlatılıyor...')

    // Admin kullanıcısı oluştur (şifreyi hashle)
    const adminPassword = 'aslan2025'
    const passwordHash = await bcrypt.hash(adminPassword, 12)

    await prisma.adminUser.upsert({
        where: { email: 'admin@aslaninsaat.com' },
        update: {
            passwordHash,
            name: 'Admin',
            role: 'admin',
            isActive: true,
        },
        create: {
            id: 'admin-1',
            email: 'admin@aslaninsaat.com',
            passwordHash,
            name: 'Admin',
            role: 'admin',
            isActive: true,
        },
    })
    console.log('✅ Admin kullanıcısı eklendi (admin@aslaninsaat.com / aslan2025)')

    // Hizmetler
    const services = [
        {
            id: 'service-1',
            title: 'Konut Projeleri',
            titleEn: 'Residential Projects',
            description: 'Villa, apartman ve rezidans projelerinde uzman çözümler',
            descriptionEn: 'Expert solutions for villa, apartment and residence projects',
            icon: 'Home',
            features: ['Anahtar teslim', 'Depreme dayanıklı', 'Modern tasarım'],
            featuresEn: ['Turnkey', 'Earthquake resistant', 'Modern design'],
            sortOrder: 1,
        },
        {
            id: 'service-2',
            title: 'Ticari Binalar',
            titleEn: 'Commercial Buildings',
            description: 'Ofis, plaza ve iş merkezi projeleri',
            descriptionEn: 'Office, plaza and business center projects',
            icon: 'Building2',
            features: ['A+ standartları', 'Akıllı bina sistemleri', 'Enerji verimliliği'],
            featuresEn: ['A+ standards', 'Smart building systems', 'Energy efficiency'],
            sortOrder: 2,
        },
        {
            id: 'service-3',
            title: 'Tadilat & Renovasyon',
            titleEn: 'Renovation & Remodeling',
            description: 'Mevcut yapıların modernizasyonu ve yenilenmesi',
            descriptionEn: 'Modernization and renovation of existing structures',
            icon: 'Wrench',
            features: ['Hızlı teslim', 'Minimum kesinti', 'Maliyet optimizasyonu'],
            featuresEn: ['Fast delivery', 'Minimum interruption', 'Cost optimization'],
            sortOrder: 3,
        },
        {
            id: 'service-4',
            title: 'Proje Danışmanlığı',
            titleEn: 'Project Consulting',
            description: 'İnşaat projeleriniz için profesyonel danışmanlık hizmeti',
            descriptionEn: 'Professional consulting service for your construction projects',
            icon: 'FileCheck',
            features: ['Fizibilite analizi', 'Maliyet tahmini', 'Süreç yönetimi'],
            featuresEn: ['Feasibility analysis', 'Cost estimation', 'Process management'],
            sortOrder: 4,
        },
    ]

    for (const service of services) {
        await prisma.service.upsert({
            where: { id: service.id },
            update: service,
            create: service,
        })
    }
    console.log('✅ Hizmetler eklendi')

    // Projeler
    const projects = [
        {
            id: 'project-1',
            title: 'ERSA ORMAN EVLERİ',
            category: 'konut',
            status: 'completed',
            year: '2018',
            location: 'Sultanbeyli, İstanbul',
            area: '15,000 m²',
            units: '24 villa',
            description: 'Sultanbeyli ERSA ORMAN EVLERİ - Modern konut projesi',
            descriptionEn: 'Sultanbeyli ERSA FOREST HOMES - Modern residential project',
            features: ['Depreme dayanıklı', 'Özel bahçeli', '24 saat güvenlik'],
            featuresEn: ['Earthquake resistant', 'Private garden', '24/7 security'],
            images: ['/ersa.jpeg'],
            progress: 100,
            isFeatured: true,
            sortOrder: 1,
        },
        {
            id: 'project-2',
            title: 'KUMBAŞI PROJESİ',
            category: 'konut',
            status: 'ongoing',
            year: '2025',
            location: 'İstanbul',
            area: '8,500 m²',
            units: '36 daire',
            description: 'Kumbaşı Projesi - Yeni nesil konut',
            descriptionEn: 'Kumbasi Project - New generation housing',
            features: ['Akıllı ev sistemleri', 'Güneş panelleri'],
            featuresEn: ['Smart home systems', 'Solar panels'],
            images: ['/modern-apartment-building.png'],
            progress: 35,
            isFeatured: true,
            sortOrder: 2,
        },
    ]

    for (const project of projects) {
        await prisma.project.upsert({
            where: { id: project.id },
            update: project,
            create: project,
        })
    }
    console.log('✅ Projeler eklendi')

    // Blog yazıları
    const blogPosts = [
        {
            id: 'blog-1',
            title: '2025 İnşaat Trendleri: Sürdürülebilir Yapı Malzemeleri',
            titleEn: '2025 Construction Trends: Sustainable Building Materials',
            slug: '2025-insaat-trendleri-surdurulebilir-yapi-malzemeleri',
            excerpt: 'İnşaat sektöründe sürdürülebilirlik giderek daha önemli hale geliyor...',
            excerptEn: 'Sustainability is becoming increasingly important in the construction sector...',
            content: '<h2>Sürdürülebilir İnşaatın Önemi</h2><p>İnşaat sektörü küresel karbon emisyonlarının önemli bir kaynağıdır...</p>',
            contentEn: '<h2>The Importance of Sustainable Construction</h2><p>The construction industry is a significant source of global carbon emissions...</p>',
            author: 'Elif Yılmaz',
            date: new Date('2024-12-15'),
            category: 'Trendler',
            categoryEn: 'Trends',
            isPublished: true,
        },
    ]

    for (const post of blogPosts) {
        await prisma.blogPost.upsert({
            where: { id: post.id },
            update: post,
            create: post,
        })
    }
    console.log('✅ Blog yazıları eklendi')

    // Site ayarları
    const siteSettings = [
        { key: 'siteName', value: 'Aslan İnşaat', type: 'string', group: 'general' },
        { key: 'siteNameEn', value: 'Aslan Construction', type: 'string', group: 'general' },
        { key: 'siteDescription', value: '30 yılı aşkın tecrübesiyle güvenilir inşaat çözümleri sunan Aslan İnşaat, konut ve ticari projelerde kaliteyi ve müşteri memnuniyetini ön planda tutar.', type: 'string', group: 'seo' },
        { key: 'siteDescriptionEn', value: 'Aslan Construction offers reliable construction solutions with over 30 years of experience, prioritizing quality and customer satisfaction in residential and commercial projects.', type: 'string', group: 'seo' },
        { key: 'phone', value: '+90 542 274 05 94', type: 'string', group: 'contact' },
        { key: 'email', value: 'info@aslaninsaat.net', type: 'string', group: 'contact' },
        { key: 'address', value: 'Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, İstanbul', type: 'string', group: 'contact' },
        { key: 'addressEn', value: 'Çakmak Mah. Seyrek Sok. Lina Apt. 17/10, Ümraniye, Istanbul', type: 'string', group: 'contact' },
        { key: 'whatsapp', value: '+905422740594', type: 'string', group: 'contact' },
        { key: 'instagram', value: 'https://www.instagram.com/aslaninsaat', type: 'string', group: 'social' },
        { key: 'logo', value: '/images/aslan-insaat-logo - son.jpg', type: 'string', group: 'general' },
        { key: 'copyrightText', value: '© 2025 Aslan İnşaat. Tüm hakları saklıdır.', type: 'string', group: 'general' },
        { key: 'copyrightTextEn', value: '© 2025 Aslan Construction. All rights reserved.', type: 'string', group: 'general' },
    ]

    for (const setting of siteSettings) {
        await prisma.siteSetting.upsert({
            where: { key: setting.key },
            update: { value: setting.value },
            create: setting,
        })
    }
    console.log('✅ Site ayarları eklendi')

    // SSS
    const faqs = [
        {
            id: 'faq-1',
            question: 'Proje süreçleri nasıl işliyor?',
            questionEn: 'How do project processes work?',
            answer: 'Proje süreçlerimiz; ilk görüşme, tasarım, onay, inşaat ve teslim aşamalarından oluşur. Her aşamada müşterilerimizi bilgilendiriyoruz.',
            answerEn: 'Our project processes consist of initial meeting, design, approval, construction and delivery stages. We inform our customers at every stage.',
            category: 'Genel',
            categoryEn: 'General',
            sortOrder: 1,
        },
        {
            id: 'faq-2',
            question: 'Ödeme planları nasıl?',
            questionEn: 'What are the payment plans?',
            answer: 'Projeye özel esnek ödeme planları sunuyoruz. Peşinat ve taksit seçenekleri için bizimle iletişime geçebilirsiniz.',
            answerEn: 'We offer flexible payment plans specific to the project. You can contact us for down payment and installment options.',
            category: 'Ödeme',
            categoryEn: 'Payment',
            sortOrder: 2,
        },
    ]

    for (const faq of faqs) {
        await prisma.fAQ.upsert({
            where: { id: faq.id },
            update: faq,
            create: faq,
        })
    }
    console.log('✅ SSS eklendi')

    console.log('🎉 Seed işlemi tamamlandı!')
}

main()
    .catch((e) => {
        console.error('❌ Seed hatası:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
