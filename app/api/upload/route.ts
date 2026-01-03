import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get("file") as File | null
        const folder = formData.get("folder") as string || "uploads"

        if (!file) {
            return NextResponse.json(
                { error: "Dosya bulunamadı" },
                { status: 400 }
            )
        }

        // Desteklenen dosya türleri
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Sadece JPEG, PNG, WebP ve GIF dosyaları destekleniyor" },
                { status: 400 }
            )
        }

        // Maksimum dosya boyutu: 5MB
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "Dosya boyutu 5MB'dan küçük olmalıdır" },
                { status: 400 }
            )
        }

        // Klasör yolunu oluştur
        const uploadDir = path.join(process.cwd(), "public", folder)

        // Klasör yoksa oluştur
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true })
        }

        // Benzersiz dosya adı oluştur
        const timestamp = Date.now()
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
        const fileName = `${timestamp}-${originalName}`
        const filePath = path.join(uploadDir, fileName)

        // Dosyayı kaydet
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        await writeFile(filePath, buffer)

        // Public URL döndür
        const publicUrl = `/${folder}/${fileName}`

        return NextResponse.json({
            success: true,
            url: publicUrl,
            fileName: fileName
        })
    } catch (error) {
        console.error("Dosya yükleme hatası:", error)
        return NextResponse.json(
            { error: "Dosya yüklenirken bir hata oluştu" },
            { status: 500 }
        )
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}
