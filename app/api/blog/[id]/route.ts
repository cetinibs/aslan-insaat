import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Tek blog yazısı getir (id veya slug ile)
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Önce slug ile dene, bulamazsa id ile dene
        let post = await prisma.blogPost.findUnique({
            where: { slug: id },
        })

        if (!post) {
            post = await prisma.blogPost.findUnique({
                where: { id },
            })
        }

        if (!post) {
            return NextResponse.json(
                { error: 'Blog yazısı bulunamadı' },
                { status: 404 }
            )
        }

        // Görüntülenme sayısını artır
        await prisma.blogPost.update({
            where: { id: post.id },
            data: { views: { increment: 1 } },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Blog post fetch error:', error)
        return NextResponse.json(
            { error: 'Blog yazısı yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// PUT - Blog yazısı güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title: body.title,
                titleEn: body.titleEn,
                excerpt: body.excerpt,
                excerptEn: body.excerptEn,
                content: body.content,
                contentEn: body.contentEn,
                author: body.author,
                date: body.date ? new Date(body.date) : undefined,
                category: body.category,
                categoryEn: body.categoryEn,
                featuredImage: body.featuredImage,
                isPublished: body.isPublished,
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error('Blog post update error:', error)
        return NextResponse.json(
            { error: 'Blog yazısı güncellenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// DELETE - Blog yazısı sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.blogPost.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Blog post delete error:', error)
        return NextResponse.json(
            { error: 'Blog yazısı silinirken hata oluştu' },
            { status: 500 }
        )
    }
}
