"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { getFeaturedItems } from "@/lib/menu-data";
import { formatPrice } from "@/lib/utils";
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/animations";

function FeaturedCard({ item }: { item: ReturnType<typeof getFeaturedItems>[number] }) {
  const [imgError, setImgError] = useState(false);
  const showImage = item.image_url && !imgError;

  return (
    <motion.div
      className="card p-4"
      variants={staggerItem}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        {showImage ? (
          <motion.div
            className="relative w-full h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={item.image_url!}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <span className="text-3xl mb-2">🍽️</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.name}</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
        {item.description}
      </p>
        <p className="text-lg font-bold text-orange-600">
          {formatPrice(item.price)}
        </p>
    </motion.div>
  );
}

export default function FeaturedMenu() {
  const featured = getFeaturedItems();

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Specialties</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our most loved dishes, handpicked for an unforgettable dining experience
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="visible"
          variants={staggerContainer}
        >
          {featured.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </motion.div>

        <div className="text-center mt-10">
            <Link
            href="/menu"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            View Full Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}
