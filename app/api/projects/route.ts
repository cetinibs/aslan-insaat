import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Tüm projeleri getir
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const status = searchParams.get('status')
        const featured = searchParams.get('featured')

        const where: Record<string, unknown> = { isActive: true }

        if (category && (category === 'konut' || category === 'ticari')) {
            where.category = category
        }
        if (status && (status === 'completed' || status === 'ongoing')) {
            where.status = status
        }
        if (featured === 'true') {
            where.isFeatured = true
        }

        const projects = await prisma.project.findMany({
            where,
            orderBy: [
                { isFeatured: 'desc' },
                { sortOrder: 'asc' },
                { year: 'desc' },
            ],
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Projects fetch error:', error)
        return NextResponse.json(
            { error: 'Projeler yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// POST - Yeni proje ekle
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const project = await prisma.project.create({
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
                features: body.features || [],
                featuresEn: body.featuresEn || [],
                images: body.images || [],
                progress: body.progress || 0,
                isFeatured: body.isFeatured || false,
                sortOrder: body.sortOrder || 0,
                isActive: body.isActive ?? true,
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error('Project create error:', error)
        return NextResponse.json(
            { error: 'Proje oluşturulurken hata oluştu' },
            { status: 500 }
        )
    }
}
