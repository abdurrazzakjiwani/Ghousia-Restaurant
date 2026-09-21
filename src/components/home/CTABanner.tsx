"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-16 bg-white text-gray-950 dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-950">Ready to Dine at Our Restaurant</h2>
        <p className="text-lg text-gray-900 mb-8">
          Visit us at Block 3, Federal B Area, Hussainabad for an unforgettable dining experience
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/reservation">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Reserve a Table
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
