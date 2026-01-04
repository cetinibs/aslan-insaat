import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Mevcut admin kullanıcısını doğrula
export async function GET(request: NextRequest) {
    try {
        // Authorization header'dan user ID al
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { error: 'Yetkilendirme gerekli' },
                { status: 401 }
            )
        }

        const userId = authHeader.replace('Bearer ', '')

        // Kullanıcıyı veritabanından kontrol et
        const admin = await prisma.adminUser.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
            },
        })

        if (!admin || !admin.isActive) {
            return NextResponse.json(
                { error: 'Geçersiz oturum' },
                { status: 401 }
            )
        }

        return NextResponse.json({
            authenticated: true,
            user: admin,
        })
    } catch (error) {
        console.error('Auth check error:', error)
        return NextResponse.json(
            { error: 'Oturum kontrolü sırasında hata oluştu' },
            { status: 500 }
        )
    }
}
