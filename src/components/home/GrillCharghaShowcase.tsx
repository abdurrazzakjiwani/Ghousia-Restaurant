"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeInUp, viewportConfig } from "@/lib/animations";
import { formatPrice } from "@/lib/utils";
import { menuItems } from "@/lib/menu-data";

const charghaItem = menuItems.find(
  (item) => item.name.toLowerCase().includes("chargha") && item.name.toLowerCase().includes("grill")
);

export default function GrillCharghaShowcase() {
  if (!charghaItem) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Signature Dish</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our legendary Grill Chargha, slow-cooked to perfection
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-center justify-center gap-12"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
            >
              {charghaItem.image_url ? (
                <Image
                  src={charghaItem.image_url}
                  alt={charghaItem.name}
                  fill
                  sizes="384px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gradient-start to-gradient-end flex items-center justify-center">
                  <span className="text-6xl">🍗</span>
                </div>
              )}
            </div>

            <div
              className="absolute inset-0 rounded-full border-4 border-dashed border-gradient-start/30"
            />
          </div>

            <div className="text-center md:text-left max-w-md">
            <h3 className="text-2xl font-bold mb-2">{charghaItem.name}</h3>
            <p className="text-gray-600 mb-4">
              {charghaItem.description}
            </p>
            <p className="text-2xl font-bold bg-linear-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent mb-6">
              {formatPrice(charghaItem.price)}
            </p>
            <Link
              href="/menu?category=chargha"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-linear-to-r from-gradient-start to-gradient-end text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Order Now
            </Link>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
