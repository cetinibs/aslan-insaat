import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// POST - Admin girişi
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: 'E-posta ve şifre gerekli' },
                { status: 400 }
            )
        }

        // Admin kullanıcısını bul
        const admin = await prisma.adminUser.findUnique({
            where: { email },
        })

        if (!admin) {
            return NextResponse.json(
                { error: 'Geçersiz e-posta veya şifre' },
                { status: 401 }
            )
        }

        // Hesap aktif mi kontrol et
        if (!admin.isActive) {
            return NextResponse.json(
                { error: 'Hesabınız devre dışı bırakılmış' },
                { status: 403 }
            )
        }

        // Şifre doğrulama
        const isValidPassword = await bcrypt.compare(password, admin.passwordHash)

        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Geçersiz e-posta veya şifre' },
                { status: 401 }
            )
        }

        // Son giriş zamanını güncelle
        await prisma.adminUser.update({
            where: { id: admin.id },
            data: { lastLogin: new Date() },
        })

        // Başarılı giriş - kullanıcı bilgilerini döndür (şifre hariç)
        return NextResponse.json({
            success: true,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            },
        })
    } catch (error) {
        console.error('Admin login error:', error)
        return NextResponse.json(
            { error: 'Giriş sırasında hata oluştu' },
            { status: 500 }
        )
    }
}
