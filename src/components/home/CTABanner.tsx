"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  const phone = process.env.NEXT_PUBLIC_RESTAURANT_PHONE2 || "0301-3631555";
  const whatsappUrl = `https://wa.me/923013631555?text=${encodeURIComponent("Hi! I'd like to place an order.")}`;

  return (
    <section className="py-16 bg-white text-gray-950 dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-950">Ready to Order?</h2>
        <p className="text-lg text-gray-900 mb-2">
          Call us at <a href={`tel:${phone.replace(/-/g, "")}`} className="font-bold underline">{phone}</a>
        </p>
        <p className="text-lg text-gray-900 mb-8">
          or order online for delivery across Karachi
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
              Order on WhatsApp
            </Button>
          </a>
          <Link href="/reservation">
            <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/20">
              Reserve a Table
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
