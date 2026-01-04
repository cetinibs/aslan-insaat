// Veritabanı işlemleri - Prisma ile PostgreSQL
// Bu dosya API route'ları tarafından kullanılır

import prisma from './prisma'
import type {
    Service,
    Project,
    BlogPost,
    SiteSetting,
    FAQ,
    ContactMessage,
    QuoteRequest,
    AboutInfo,
    TeamMember,
    Media
} from '@prisma/client'

// Re-export types
export type {
    Service,
    Project,
    BlogPost,
    SiteSetting,
    FAQ,
    ContactMessage,
    QuoteRequest,
    AboutInfo,
    TeamMember,
    Media
}

// ============== HİZMETLER ==============
export async function getServicesFromDB(): Promise<Service[]> {
    return prisma.service.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
    })
}

export async function getServiceByIdFromDB(id: string): Promise<Service | null> {
    return prisma.service.findUnique({ where: { id } })
}

export async function createServiceInDB(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    return prisma.service.create({ data })
}

export async function updateServiceInDB(id: string, data: Partial<Service>): Promise<Service> {
    return prisma.service.update({ where: { id }, data })
}

export async function deleteServiceFromDB(id: string): Promise<void> {
    await prisma.service.delete({ where: { id } })
}

// ============== PROJELER ==============
export async function getProjectsFromDB(filters?: {
    category?: 'konut' | 'ticari'
    status?: 'completed' | 'ongoing'
    featured?: boolean
}): Promise<Project[]> {
    const where: Record<string, unknown> = { isActive: true }

    if (filters?.category) where.category = filters.category
    if (filters?.status) where.status = filters.status
    if (filters?.featured) where.isFeatured = true

    return prisma.project.findMany({
        where,
        orderBy: [
            { isFeatured: 'desc' },
            { sortOrder: 'asc' },
            { year: 'desc' },
        ],
    })
}

export async function getProjectByIdFromDB(id: string): Promise<Project | null> {
    return prisma.project.findUnique({ where: { id } })
}

export async function createProjectInDB(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return prisma.project.create({ data })
}

export async function updateProjectInDB(id: string, data: Partial<Project>): Promise<Project> {
    return prisma.project.update({ where: { id }, data })
}

export async function deleteProjectFromDB(id: string): Promise<void> {
    await prisma.project.delete({ where: { id } })
}

// ============== BLOG YAZILARI ==============
export async function getBlogPostsFromDB(filters?: {
    category?: string
    published?: boolean
    limit?: number
}): Promise<BlogPost[]> {
    const where: Record<string, unknown> = {}

    if (filters?.category) where.category = filters.category
    if (filters?.published) where.isPublished = true

    return prisma.blogPost.findMany({
        where,
        orderBy: { date: 'desc' },
        take: filters?.limit,
    })
}

export async function getBlogPostByIdFromDB(id: string): Promise<BlogPost | null> {
    return prisma.blogPost.findUnique({ where: { id } })
}

export async function getBlogPostBySlugFromDB(slug: string): Promise<BlogPost | null> {
    return prisma.blogPost.findUnique({ where: { slug } })
}

export async function createBlogPostInDB(data: Omit<BlogPost, 'id' | 'views' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    return prisma.blogPost.create({ data })
}

export async function updateBlogPostInDB(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    return prisma.blogPost.update({ where: { id }, data })
}

export async function deleteBlogPostFromDB(id: string): Promise<void> {
    await prisma.blogPost.delete({ where: { id } })
}

export async function incrementBlogPostViews(id: string): Promise<void> {
    await prisma.blogPost.update({
        where: { id },
        data: { views: { increment: 1 } },
    })
}

// ============== SİTE AYARLARI ==============
export async function getSiteSettingsFromDB(): Promise<Record<string, string>> {
    const settings = await prisma.siteSetting.findMany()
    const result: Record<string, string> = {}
    for (const setting of settings) {
        result[setting.key] = setting.value
    }
    return result
}

export async function updateSiteSettingsInDB(settings: Record<string, string>): Promise<void> {
    const updates = Object.entries(settings).map(([key, value]) =>
        prisma.siteSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value, type: 'string', group: 'general' },
        })
    )
    await Promise.all(updates)
}

// ============== SSS ==============
export async function getFAQsFromDB(): Promise<FAQ[]> {
    return prisma.fAQ.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
    })
}

export async function createFAQInDB(data: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    return prisma.fAQ.create({ data })
}

export async function updateFAQInDB(id: string, data: Partial<FAQ>): Promise<FAQ> {
    return prisma.fAQ.update({ where: { id }, data })
}

export async function deleteFAQFromDB(id: string): Promise<void> {
    await prisma.fAQ.delete({ where: { id } })
}

// ============== İLETİŞİM MESAJLARI ==============
export async function getContactMessagesFromDB(): Promise<ContactMessage[]> {
    return prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function createContactMessageInDB(data: Omit<ContactMessage, 'id' | 'isRead' | 'createdAt'>): Promise<ContactMessage> {
    return prisma.contactMessage.create({ data })
}

export async function markContactMessageAsRead(id: string): Promise<void> {
    await prisma.contactMessage.update({
        where: { id },
        data: { isRead: true },
    })
}

// ============== TEKLİF TALEPLERİ ==============
export async function getQuoteRequestsFromDB(): Promise<QuoteRequest[]> {
    return prisma.quoteRequest.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function createQuoteRequestInDB(data: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<QuoteRequest> {
    return prisma.quoteRequest.create({ data })
}

export async function updateQuoteRequestStatusInDB(id: string, status: 'pending' | 'contacted' | 'negotiating' | 'accepted' | 'rejected', notes?: string): Promise<QuoteRequest> {
    return prisma.quoteRequest.update({
        where: { id },
        data: { status, notes },
    })
}

// ============== HAKKIMIZDA ==============
export async function getAboutInfoFromDB(): Promise<AboutInfo[]> {
    return prisma.aboutInfo.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
    })
}

export async function createAboutInfoInDB(data: Omit<AboutInfo, 'id' | 'createdAt' | 'updatedAt'>): Promise<AboutInfo> {
    return prisma.aboutInfo.create({ data })
}

export async function updateAboutInfoInDB(id: string, data: Partial<AboutInfo>): Promise<AboutInfo> {
    return prisma.aboutInfo.update({ where: { id }, data })
}

// ============== EKİP ÜYELERİ ==============
export async function getTeamMembersFromDB(): Promise<TeamMember[]> {
    return prisma.teamMember.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
    })
}

export async function createTeamMemberInDB(data: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): Promise<TeamMember> {
    return prisma.teamMember.create({ data })
}

export async function updateTeamMemberInDB(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    return prisma.teamMember.update({ where: { id }, data })
}

export async function deleteTeamMemberFromDB(id: string): Promise<void> {
    await prisma.teamMember.delete({ where: { id } })
}

// ============== MEDYA ==============
export async function getMediaFromDB(folder?: string): Promise<Media[]> {
    return prisma.media.findMany({
        where: folder ? { folder } : undefined,
        orderBy: { createdAt: 'desc' },
    })
}

export async function createMediaInDB(data: Omit<Media, 'id' | 'createdAt'>): Promise<Media> {
    return prisma.media.create({ data })
}

export async function deleteMediaFromDB(id: string): Promise<void> {
    await prisma.media.delete({ where: { id } })
}
