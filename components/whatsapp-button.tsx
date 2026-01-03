"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "905422740594"
  const message = "Merhaba, Aslan İnşaat hakkında bilgi almak istiyorum."

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle size={28} className="fill-current" />
    </button>
  )
}
