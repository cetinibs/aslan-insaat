import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Tek hizmet getir
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const service = await prisma.service.findUnique({
            where: { id },
        })

        if (!service) {
            return NextResponse.json(
                { error: 'Hizmet bulunamadı' },
                { status: 404 }
            )
        }

        return NextResponse.json(service)
    } catch (error) {
        console.error('Service fetch error:', error)
        return NextResponse.json(
            { error: 'Hizmet yüklenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// PUT - Hizmet güncelle
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        const service = await prisma.service.update({
            where: { id },
            data: {
                title: body.title,
                titleEn: body.titleEn,
                description: body.description,
                descriptionEn: body.descriptionEn,
                icon: body.icon,
                features: body.features,
                featuresEn: body.featuresEn,
                sortOrder: body.sortOrder,
                isActive: body.isActive,
            },
        })

        return NextResponse.json(service)
    } catch (error) {
        console.error('Service update error:', error)
        return NextResponse.json(
            { error: 'Hizmet güncellenirken hata oluştu' },
            { status: 500 }
        )
    }
}

// DELETE - Hizmet sil
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        await prisma.service.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Service delete error:', error)
        return NextResponse.json(
            { error: 'Hizmet silinirken hata oluştu' },
            { status: 500 }
        )
    }
}
