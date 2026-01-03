import { NextRequest, NextResponse } from "next/server"

// E-posta gönderim konfigürasyonu
const RECIPIENT_EMAIL = "info@aslaninsaat.net"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, subject, message, formType } = body

        // Form validasyonu
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Ad, e-posta ve mesaj alanları zorunludur." },
                { status: 400 }
            )
        }

        // E-posta içeriğini oluştur
        const emailContent = {
            to: RECIPIENT_EMAIL,
            subject: formType === "quote"
                ? `[Teklif Talebi] ${name}`
                : `[İletişim Formu] ${subject || "Genel"}`,
            html: `
        <h2>${formType === "quote" ? "Yeni Teklif Talebi" : "Yeni İletişim Mesajı"}</h2>
        <hr/>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
        ${subject ? `<p><strong>Konu:</strong> ${subject}</p>` : ""}
        <hr/>
        <h3>Mesaj:</h3>
        <p>${message}</p>
        <hr/>
        <p style="font-size: 12px; color: #666;">
          Bu mesaj ${new Date().toLocaleString("tr-TR")} tarihinde Aslan İnşaat web sitesi üzerinden gönderilmiştir.
        </p>
      `,
        }

        // NOT: Gerçek e-posta gönderimi için bir e-posta servisi entegrasyonu gerekiyor
        // Örnek servisler: Resend, SendGrid, Nodemailer (SMTP), AWS SES
        // 
        // Aşağıda Resend örneği:
        // 
        // import { Resend } from 'resend';
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // await resend.emails.send({
        //   from: 'Aslan İnşaat <noreply@aslaninsaat.net>',
        //   to: RECIPIENT_EMAIL,
        //   subject: emailContent.subject,
        //   html: emailContent.html,
        //   replyTo: email,
        // });

        // Şimdilik form verilerini konsola loglayalım
        console.log("=== YENİ FORM GÖNDERİMİ ===")
        console.log("Alıcı:", RECIPIENT_EMAIL)
        console.log("Konu:", emailContent.subject)
        console.log("Gönderen:", name, "-", email)
        console.log("Telefon:", phone)
        console.log("Mesaj:", message)
        console.log("Tarih:", new Date().toLocaleString("tr-TR"))
        console.log("===========================")

        return NextResponse.json(
            {
                success: true,
                message: "Form başarıyla alındı. En kısa sürede size dönüş yapacağız.",
                // Debug için (production'da kaldırılmalı)
                debug: {
                    recipient: RECIPIENT_EMAIL,
                    formData: { name, email, phone, subject }
                }
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Form gönderim hatası:", error)
        return NextResponse.json(
            { error: "Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin." },
            { status: 500 }
        )
    }
}
