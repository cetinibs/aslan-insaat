import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Tüm hizmetleri getir
export async function GET() {
    try {
        const services = await prisma.service.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        })
        return NextResponse.json(services)
    } catch (error) {
        console.error('Services fetch error:', error)
        return NextResponse.json(
            { error: 'Hizmetler yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// POST - Yeni hizmet ekle
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const service = await prisma.service.create({
            data: {
                title: body.title,
                titleEn: body.titleEn,
                description: body.description,
                descriptionEn: body.descriptionEn,
                icon: body.icon,
                features: body.features || [],
                featuresEn: body.featuresEn || [],
                sortOrder: body.sortOrder || 0,
                isActive: body.isActive ?? true,
            },
        })

        return NextResponse.json(service, { status: 201 })
    } catch (error) {
        console.error('Service create error:', error)
        return NextResponse.json(
            { error: 'Hizmet oluşturulurken hata oluştu' },
            { status: 500 }
        )
    }
}
