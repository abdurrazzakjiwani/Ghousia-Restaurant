"use client";

import { motion } from "motion/react";

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923013631555";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent("Assalam-o-Alaikum! I'd like to place an order.")}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-6 z-40 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Order on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-current">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.058 9.374L1.054 31.25l6.118-1.958A15.907 15.907 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.158 2.28-.84.18-1.936.322-5.628-1.208-4.726-1.96-7.764-6.764-7.996-7.076-.226-.312-1.86-2.48-1.86-4.73s1.176-3.354 1.594-3.814c.39-.426.924-.56 1.23-.56.312 0 .624.002.896.016.29.014.68-.11 1.062.812.39.952 1.332 3.24 1.448 3.474.116.234.194.506.038.818-.156.312-.234.506-.466.78-.234.274-.49.612-.696.82-.234.234-.476.486-.204.958.274.472 1.216 2.008 2.61 3.254 1.792 1.6 3.302 2.1 3.774 2.332.472.234.746.194 1.02-.116.274-.312 1.164-1.356 1.474-1.826.312-.472.624-.39 1.062-.234.438.156 2.776 1.312 3.25 1.55.472.234.786.35.904.546.116.194.116 1.14-.274 2.24z" />
      </svg>
    </motion.a>
  );
}
