"use client";

import { motion } from "motion/react";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

const features = [
  {
    icon: "🥬",
    title: "Fresh Ingredients",
    description: "We source the finest local ingredients daily to ensure every dish is fresh and flavorful.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    description: "Hot and fresh food delivered to your doorstep across all of Karachi in under 45 minutes.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Recipes",
    description: "Authentic recipes passed down through generations, preserving the true taste of Pakistani cuisine.",
  },
  {
    icon: "📱",
    title: "Easy Ordering",
    description: "Order via WhatsApp, phone, or visit us in person. Multiple convenient ways to enjoy our food.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We&apos;re committed to delivering the best dining experience with quality food and exceptional service
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="text-center"
              variants={staggerItem}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br from-gradient-start to-gradient-end flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
