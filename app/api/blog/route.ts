import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Slug oluşturma fonksiyonu
function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[çÇ]/g, 'c')
        .replace(/[ğĞ]/g, 'g')
        .replace(/[ıİ]/g, 'i')
        .replace(/[öÖ]/g, 'o')
        .replace(/[şŞ]/g, 's')
        .replace(/[üÜ]/g, 'u')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
}

// GET - Tüm blog yazılarını getir
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const published = searchParams.get('published')
        const limit = searchParams.get('limit')

        const where: Record<string, unknown> = {}

        if (category) {
            where.category = category
        }
        if (published === 'true') {
            where.isPublished = true
        }

        const posts = await prisma.blogPost.findMany({
            where,
            orderBy: { date: 'desc' },
            take: limit ? parseInt(limit) : undefined,
        })

        return NextResponse.json(posts)
    } catch (error) {
        console.error('Blog posts fetch error:', error)
        return NextResponse.json(
            { error: 'Blog yazıları yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// POST - Yeni blog yazısı ekle
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Slug oluştur (benzersiz olmalı)
        let slug = createSlug(body.title)
        const existingPost = await prisma.blogPost.findUnique({ where: { slug } })
        if (existingPost) {
            slug = `${slug}-${Date.now()}`
        }

        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                titleEn: body.titleEn,
                slug,
                excerpt: body.excerpt,
                excerptEn: body.excerptEn,
                content: body.content,
                contentEn: body.contentEn,
                author: body.author,
                date: new Date(body.date || Date.now()),
                category: body.category,
                categoryEn: body.categoryEn,
                featuredImage: body.featuredImage,
                isPublished: body.isPublished ?? false,
            },
        })

        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error('Blog post create error:', error)
        return NextResponse.json(
            { error: 'Blog yazısı oluşturulurken hata oluştu' },
            { status: 500 }
        )
    }
}
