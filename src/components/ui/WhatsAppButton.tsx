"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923013631555";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent("Assalam-o-Alaikum! I'd like to place an order.")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
