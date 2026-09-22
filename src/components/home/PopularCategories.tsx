"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { categories } from "@/lib/menu-data";
import { staggerContainer, staggerItem } from "@/lib/animations";

const displayCategories = categories.slice(0, 8);

export default function PopularCategories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our most loved food categories
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4"
          initial="visible"
          variants={staggerContainer}
        >
          {displayCategories.map((cat) => (
            <motion.div key={cat.id} variants={staggerItem}>
              <Link
                href={`/menu?category=${cat.slug}`}
                className="card p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow group"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  View Menu →
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link
            href="/menu"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
