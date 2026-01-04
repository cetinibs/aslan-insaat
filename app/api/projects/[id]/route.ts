import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Tek proje getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const project = await prisma.project.findUnique({
            where: { id },
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Proje bulunamadı' },
                { status: 404 }
            )
        }

        return NextResponse.json(project)
    } catch (error) {
        console.error('Project fetch error:', error)
        return NextResponse.json(
            { error: 'Proje yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// PUT - Proje güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const project = await prisma.project.update({
            where: { id },
            data: {
                title: body.title,
                category: body.category,
                status: body.status,
                year: body.year,
                location: body.location,
                area: body.area,
                units: body.units,
                description: body.description,
                descriptionEn: body.descriptionEn,
                features: body.features,
                featuresEn: body.featuresEn,
                images: body.images,
                progress: body.progress,
                isFeatured: body.isFeatured,
                sortOrder: body.sortOrder,
                isActive: body.isActive,
            },
        })

        return NextResponse.json(project)
    } catch (error) {
        console.error('Project update error:', error)
        return NextResponse.json(
            { error: 'Proje güncellenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// DELETE - Proje sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.project.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Project delete error:', error)
        return NextResponse.json(
            { error: 'Proje silinirken hata oluştu' },
            { status: 500 }
        )
    }
}
